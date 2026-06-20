import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Lazy singleton — only throws if you actually try to use it without env vars set
let _client = null;

function getClient() {
  if (_client) return _client;
  if (!supabaseUrl || !supabaseKey) {
    // Return a safe no-op proxy during build / SSG when env vars are not available
    if (typeof window === 'undefined') {
      return createNoopClient();
    }
    console.warn(
      '[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set.'
    );
    return createNoopClient();
  }
  _client = createClient(supabaseUrl, supabaseKey);
  return _client;
}

// Minimal no-op client that returns empty data so pages don't crash on build
function createNoopClient() {
  const noop = () => Promise.resolve({ data: null, error: null });
  const chainable = {
    select: () => chainable,
    insert: () => chainable,
    update: () => chainable,
    delete: () => chainable,
    upsert: () => chainable,
    eq: () => chainable,
    order: () => chainable,
    maybeSingle: noop,
    then: (resolve) => resolve({ data: null, error: null }),
  };
  return {
    from: () => chainable,
    storage: {
      from: () => ({
        upload: noop,
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
    auth: {
      signIn: noop,
      signOut: noop,
      getSession: noop,
    },
  };
}

// Export a proxy that lazily creates the real client on first use
export const supabase = new Proxy(
  {},
  {
    get(_, prop) {
      return getClient()[prop];
    },
  }
);
