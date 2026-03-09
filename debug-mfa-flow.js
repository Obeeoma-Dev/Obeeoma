// Surgical MFA Flow Debug Script
// Run this in browser console when on MFA page

console.log('🔬 Surgical MFA Flow Debug Started...');

// Function to check current auth state
function checkAuthState() {
  console.log('\n📊 Current Authentication State:');
  console.log('===============================');
  
  // Check Redux state
  const authState = window.__REDUX_DEVTOOLS_EXTENSION__?.getState()?.auth;
  if (authState) {
    console.log('Redux User:', authState.user);
    console.log('Redux Token:', authState.token ? '✅ Present' : '❌ Missing');
    console.log('Redux User Role:', authState.user?.role);
    console.log('Redux MFA Confirmed:', authState.isMfaSetupConfirmed);
  } else {
    console.log('❌ Redux state not accessible');
  }
  
  // Check localStorage
  console.log('\n💾 LocalStorage State:');
  console.log('localStorage Token:', localStorage.getItem('token') ? '✅ Present' : '❌ Missing');
  console.log('localStorage User:', localStorage.getItem('user'));
  
  try {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('localStorage User Role:', localUser.role);
  } catch (e) {
    console.log('❌ Error parsing localStorage user:', e);
  }
  
  return { authState, localUser: JSON.parse(localStorage.getItem('user') || '{}') };
}

// Function to test routing logic
function testRouting(user) {
  console.log('\n🧭 Testing Routing Logic:');
  console.log('==========================');
  
  // Import the same routing logic from your app
  function getDashboardRoute(user) {
    if (!user) {
      return "/login";
    }

    switch (user.role) {
      case "systemadmin":
        return "/system-admin";
      case "system_admin":
        return "/system-admin";
      case "employer":
        return "/employer-dashboard";
      case "employee":
        return "/employee-dashboard";
      default:
        console.warn(`Unrecognized role: ${user.role}. Redirecting to default.`);
        return "/";
    }
  }
  
  const route = getDashboardRoute(user);
  console.log(`User Role: ${user?.role}`);
  console.log(`Calculated Route: ${route}`);
  console.log(`Expected for System Admin: /system-admin`);
  console.log(`Route Correct: ${route === '/system-admin' ? '✅' : '❌'}`);
  
  return route;
}

// Function to simulate the MFA success button click
function simulateMFASuccess() {
  console.log('\n🎯 Simulating MFA Success Button Click:');
  console.log('=========================================');
  
  const state = checkAuthState();
  const route = testRouting(state.authState?.user || state.localUser);
  
  console.log(`\n🔄 Would navigate to: ${route}`);
  
  // Check if this route is protected
  const protectedRoutes = ['/system-admin', '/employer-dashboard', '/employee-dashboard'];
  const isProtected = protectedRoutes.some(r => route.startsWith(r));
  console.log(`Route is Protected: ${isProtected ? '✅' : '❌'}`);
  
  if (isProtected) {
    console.log('🛡️ ProtectedRoute will check authentication...');
    const isAuthenticated = !!(state.authState?.user && state.authState?.token);
    console.log(`Authentication Status: ${isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}`);
    
    if (!isAuthenticated) {
      console.log('❌ This is the problem! ProtectedRoute will redirect to /login');
      console.log('🔧 Fix: Ensure user and token are properly set after MFA confirmation');
    }
  }
  
  return { route, isProtected, isAuthenticated };
}

// Function to check ProtectedRoute component
function checkProtectedRoute() {
  console.log('\n🛡️ ProtectedRoute Analysis:');
  console.log('=============================');
  
  const state = checkAuthState();
  
  // Simulate ProtectedRoute logic
  const isAuthenticated = !!(state.authState?.user && state.authState?.token);
  
  console.log(`ProtectedRoute Check:`);
  console.log(`- User exists: ${!!state.authState?.user}`);
  console.log(`- Token exists: ${!!state.authState?.token}`);
  console.log(`- Is Authenticated: ${isAuthenticated}`);
  console.log(`- Will Redirect to: ${isAuthenticated ? '✅ Protected Content' : '❌ /login'}`);
  
  return isAuthenticated;
}

// Main debug function
function debugMFAFlow() {
  console.log('🚀 Starting Surgical MFA Flow Debug...\n');
  
  // Step 1: Check current state
  const state = checkAuthState();
  
  // Step 2: Test routing
  const route = testRouting(state.authState?.user || state.localUser);
  
  // Step 3: Check ProtectedRoute
  const isAuth = checkProtectedRoute();
  
  // Step 4: Simulate navigation
  const navResult = simulateMFASuccess();
  
  // Step 5: Diagnosis
  console.log('\n🔍 Diagnosis:');
  console.log('=============');
  
  if (!state.authState?.user && !state.localUser?.id) {
    console.log('❌ PROBLEM: No user data found after MFA');
    console.log('🔧 SOLUTION: Check confirmMfa.fulfilled in authSlice.ts');
  }
  
  if (!state.authState?.token && !localStorage.getItem('token')) {
    console.log('❌ PROBLEM: No authentication token found');
    console.log('🔧 SOLUTION: Check if token is being saved in confirmMfa.fulfilled');
  }
  
  if (state.authState?.user?.role !== 'system_admin' && state.localUser?.role !== 'system_admin') {
    console.log('❌ PROBLEM: User role is not system_admin');
    console.log(`🔧 Current role: ${state.authState?.user?.role || state.localUser?.role}`);
  }
  
  if (route !== '/system-admin') {
    console.log('❌ PROBLEM: Routing logic is incorrect');
    console.log(`🔧 Expected: /system-admin, Got: ${route}`);
  }
  
  if (!isAuth) {
    console.log('❌ PROBLEM: ProtectedRoute will reject authentication');
    console.log('🔧 This explains why you see the landing page');
  }
  
  console.log('\n🎯 Expected Flow:');
  console.log('1. ✅ MFA Success → User and Token saved');
  console.log('2. ✅ User role: system_admin');
  console.log('3. ✅ Route calculated: /system-admin');
  console.log('4. ✅ ProtectedRoute allows access');
  console.log('5. ✅ System Admin Dashboard displayed');
  
  console.log('\n🏁 Debug completed!');
  
  return {
    user: state.authState?.user || state.localUser,
    token: state.authState?.token || localStorage.getItem('token'),
    route,
    isAuthenticated: isAuth
  };
}

// Auto-run
debugMFAFlow();
