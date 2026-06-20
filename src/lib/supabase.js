import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Lazy singleton — only throws if you actually try to use it without env vars set
let _client = null;

function getClient() {
  if (_client) return _client;
  
  const isPlaceholder = supabaseUrl?.includes('your-project-id');

  if (!supabaseUrl || !supabaseKey || isPlaceholder) {
    if (typeof window !== 'undefined') {
      console.warn(
        '[Supabase] Using Mock Client because NEXT_PUBLIC_SUPABASE_URL is either not set or is a placeholder.'
      );
    }
    _client = createMockClient();
    return _client;
  }
  
  _client = createClient(supabaseUrl, supabaseKey);
  return _client;
}

// A more robust mock client that simulates success for testing UI flows
function createMockClient() {
  const mockUser = {
    id: 'mock-user-123',
    email: 'test@example.com',
    user_metadata: { full_name: 'Test User' }
  };
  
  const mockSession = {
    access_token: 'mock-token',
    user: mockUser
  };

  // Keep session state in memory to allow UI logic to flow
  let currentSession = null;

  return {
    from: () => {
      let isOrQuery = false;
      
      const singleMock = () => Promise.resolve({ 
        data: isOrQuery ? null : { id: 'mock-id', progress: [], username: 'mockuser', email: 'test@example.com' }, 
        error: null 
      });

      const chainable = {
        select: () => chainable,
        insert: () => chainable,
        update: () => chainable,
        delete: () => chainable,
        upsert: () => chainable,
        eq: () => chainable,
        or: () => { isOrQuery = true; return chainable; },
        order: () => chainable,
        single: singleMock,
        maybeSingle: singleMock,
        then: (resolve) => resolve({ data: [], error: null }),
      };
      
      return chainable;
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: {}, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
    auth: {
      signUp: async () => {
        currentSession = mockSession;
        return { data: { user: mockUser, session: mockSession }, error: null };
      },
      signInWithPassword: async () => {
        currentSession = mockSession;
        return { data: { user: mockUser, session: mockSession }, error: null };
      },
      signInWithOAuth: async ({ options }) => {
        currentSession = mockSession;
        if (typeof window !== 'undefined' && options?.redirectTo) {
          setTimeout(() => { window.location.href = options.redirectTo; }, 500);
        }
        return { data: { provider: 'google', url: options?.redirectTo || '/' }, error: null };
      },
      signOut: async () => {
        currentSession = null;
        return { error: null };
      },
      getSession: async () => {
        return { data: { session: currentSession }, error: null };
      },
      onAuthStateChange: () => {
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
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
