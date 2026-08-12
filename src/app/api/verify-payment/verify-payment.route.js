import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This route runs server-side only, so it's safe to use the Paystack SECRET
// key and the Supabase SERVICE ROLE key here — never expose either of those
// with NEXT_PUBLIC_ prefixes or in client code.
//
// Why verify server-side at all, instead of trusting the Paystack popup's
// own "success" callback? Because a client-side callback can be faked or
// intercepted. This route re-checks the transaction directly with Paystack
// using your secret key before writing `application_paid = true` to the
// database, so access can't be unlocked without a real, confirmed payment.

export async function POST(req) {
  try {
    const { reference, studentId } = await req.json();

    if (!reference || !studentId) {
      return NextResponse.json({ error: 'Missing reference or studentId.' }, { status: 400 });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return NextResponse.json(
        { error: 'Payment verification is not configured on the server yet.' },
        { status: 500 }
      );
    }

    // 1. Ask Paystack to confirm this transaction actually succeeded.
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${paystackSecret}` },
    });
    const verifyData = await verifyRes.json();

    if (!verifyRes.ok || verifyData?.data?.status !== 'success') {
      return NextResponse.json({ error: 'Payment could not be verified.' }, { status: 400 });
    }

    // 2. Mark the student's account as unlocked.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Database is not configured on the server yet.' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { error: updateErr } = await supabaseAdmin
      .from('students')
      .update({
        application_paid: true,
        application_fee_ref: reference,
      })
      .eq('id', studentId);

    if (updateErr) throw updateErr;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('verify-payment error:', err);
    return NextResponse.json({ error: 'Something went wrong verifying your payment.' }, { status: 500 });
  }
}
