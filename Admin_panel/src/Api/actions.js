import axios from "../config/axios";


export const gettrainnerlist = (async () => {
    try {

        let resdata = await axios.get('/trainer-list')

        return {
            result: resdata.data.result,
            success: resdata.data.success,
        }
    } catch (err) {
        return {
            result: [],
            success: false,
            err: err
        }
    }
})



export const registerTrainer = (async (data) => {
    try {

        let resdata = await axios.post('/register-trainer',data)

        return {
            result: resdata.data.result,
            success: resdata.data.success,
        }
    } catch (err) {
        return {
            result: [],
            success: false,
            err: err
        }
    }
})

export const AdminLogin = (async (data) => {
    try {

        let resdata = await axios.post('/admin-login',data)

        return {
            result: resdata.data.result,
            success: resdata.data.success,
            token: resdata.data.token,
            errors : resdata.data.errors,

        }
    } catch (err) {
        return {
            result: [],
            success: false,
            err: err
        }
    }
})

export const setstudentscore = (async (data) => {
    try {

        let resdata = await axios.post('/set-student-scroe',data)

        return {
            result: resdata.data.result,
            success: resdata.data.success,
            errors : resdata.data.errors,

        }
    } catch (err) {
        return {
            result: [],
            success: false,
            err: err
        }
    }
})


export const gettree = (async (data) => {
    try {

        let resdata = await axios.get('/get-tree');

        return {
            result: resdata.data.result,
            success: resdata.data.success,
        }
    } catch (err) {
        return {
            result: [],
            success: false,
            err: err
        }
    }
})
