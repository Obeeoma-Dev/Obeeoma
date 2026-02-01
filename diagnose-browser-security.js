// Browser Security Diagnostic Tool
// Run this in browser console when on your Obeeoma app

console.log('🔍 Browser Security Diagnostic Tool Started...');

// Test 1: Check if popstate events are firing
function testPopstateEvents() {
    console.log('\n📡 Test 1: Checking popstate events...');
    
    let popstateFired = false;
    
    const handlePopstate = (event) => {
        popstateFired = true;
        console.log('✅ popstate event fired!', event);
        console.log('Event state:', event.state);
    };
    
    window.addEventListener('popstate', handlePopstate);
    
    // Simulate back button
    console.log('🔄 Simulating back button...');
    window.history.back();
    
    setTimeout(() => {
        if (popstateFired) {
            console.log('✅ popstate events are working');
        } else {
            console.log('❌ popstate events NOT firing');
            console.log('🔧 This could be the main issue!');
        }
        
        window.removeEventListener('popstate', handlePopstate);
    }, 1000);
}

// Test 2: Check browser cache behavior
function testBrowserCache() {
    console.log('\n💾 Test 2: Checking browser cache behavior...');
    
    // Check current page state
    console.log('Current URL:', window.location.href);
    console.log('History length:', window.history.length);
    console.log('History state:', window.history.state);
    
    // Check if page is being served from cache
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
        const navigation = navigationEntries[0];
        console.log('Navigation type:', navigation.type);
        console.log('Transfer size:', navigation.transferSize);
        
        if (navigation.transferSize === 0 && navigation.type === 'back_forward') {
            console.log('⚠️ Page loaded from browser cache!');
            console.log('🔧 This is likely the main issue!');
        }
    }
}

// Test 3: Check authentication state
function testAuthenticationState() {
    console.log('\n🔐 Test 3: Checking authentication state...');
    
    // Check Redux state
    const authState = window.__REDUX_DEVTOOLS_EXTENSION__?.getState()?.auth;
    if (authState) {
        console.log('Redux user:', authState.user ? 'Present' : 'Missing');
        console.log('Redux token:', authState.token ? 'Present' : 'Missing');
        console.log('Redux isMfaSetupConfirmed:', authState.isMfaSetupConfirmed);
    } else {
        console.log('❌ Redux state not accessible');
    }
    
    // Check localStorage
    const localToken = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');
    
    console.log('localStorage token:', localToken ? 'Present' : 'Missing');
    console.log('localStorage user:', localUser ? 'Present' : 'Missing');
    
    if (localUser) {
        try {
            const user = JSON.parse(localUser);
            console.log('User role:', user.role);
            console.log('User email:', user.email);
        } catch (e) {
            console.log('❌ Error parsing localStorage user');
        }
    }
}

// Test 4: Check if our security components are loaded
function testSecurityComponents() {
    console.log('\n🛡️ Test 4: Checking security components...');
    
    // Check if HistoryGuard is active
    const historyGuardElements = document.querySelectorAll('[data-testid="history-guard"]');
    console.log('HistoryGuard elements found:', historyGuardElements.length);
    
    // Check if ProtectedRoute is active
    const protectedRouteElements = document.querySelectorAll('[data-testid="protected-route"]');
    console.log('ProtectedRoute elements found:', protectedRouteElements.length);
    
    // Check for event listeners
    const popstateListeners = getEventListeners ? getEventListeners(window) : {};
    console.log('popstate listeners:', popstateListeners.popstate?.length || 'Unknown');
}

// Test 5: Simulate the exact issue
function simulateBackForwardIssue() {
    console.log('\n🔄 Test 5: Simulating back/forward issue...');
    
    console.log('Step 1: Current state');
    console.log('- URL:', window.location.href);
    console.log('- Authenticated:', !!(localStorage.getItem('token') && localStorage.getItem('user')));
    
    console.log('\nStep 2: Simulate logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh');
    
    console.log('Step 3: Try to navigate back');
    console.log('🔄 Attempting to go back...');
    window.history.back();
    
    setTimeout(() => {
        console.log('Step 4: Check result');
        console.log('- URL after back:', window.location.href);
        console.log('- Still on protected page?', window.location.pathname.includes('/system-admin') || window.location.pathname.includes('/employer-dashboard') || window.location.pathname.includes('/employee-dashboard'));
        
        console.log('\n🔍 Diagnosis:');
        if (window.location.pathname !== '/login') {
            console.log('❌ ISSUE CONFIRMED: Browser navigation bypass is working!');
            console.log('🔧 The security measures are not preventing this');
        } else {
            console.log('✅ Security is working properly');
        }
    }, 1000);
}

// Test 6: Check server-side caching headers
function testServerHeaders() {
    console.log('\n🌐 Test 6: Checking server response headers...');
    
    fetch(window.location.href, { method: 'HEAD' })
        .then(response => {
            console.log('Cache-Control:', response.headers.get('cache-control'));
            console.log('Pragma:', response.headers.get('pragma'));
            console.log('Expires:', response.headers.get('expires'));
            console.log('ETag:', response.headers.get('etag'));
            console.log('Last-Modified:', response.headers.get('last-modified'));
            
            const cacheControl = response.headers.get('cache-control');
            if (cacheControl && cacheControl.includes('no-cache')) {
                console.log('✅ Server is sending proper cache headers');
            } else {
                console.log('⚠️ Server might not be sending proper cache headers');
                console.log('🔧 This could allow browser caching!');
            }
        })
        .catch(error => {
            console.log('❌ Error checking headers:', error);
        });
}

// Main diagnostic runner
function runFullDiagnosis() {
    console.log('🚀 Running Full Browser Security Diagnosis...\n');
    
    testAuthenticationState();
    testBrowserCache();
    testPopstateEvents();
    testSecurityComponents();
    testServerHeaders();
    simulateBackForwardIssue();
    
    console.log('\n🏁 Diagnosis completed!');
    console.log('📝 Check the results above to identify the main issue');
}

// Auto-run
runFullDiagnosis();
