

function Logout() {

    sessionStorage.removeItem('items');
    window.location.reload();
}

export default Logout;