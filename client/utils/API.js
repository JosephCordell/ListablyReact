/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
    checkLoggedIn: function (user, setUser) {
        if (localStorage.getItem('token') && localStorage.getItem('loggedIn') !== 'true') {
            axios.post('/api/users/login', {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
                if (response.status === 200) {
            setUser({ ...user, loggedIn: response.data.logged_in });
            localStorage.setItem(`loggedIn`, true)
        } else {
            setUser({ ...user, loggedIn: false });
            localStorage.removeItem(`loggedIn`)
            
        }
    });
}
},

}