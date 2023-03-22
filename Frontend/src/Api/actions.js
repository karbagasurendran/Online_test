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



export const registerStudent = (async (data) => {
    try {

        let resdata = await axios.post('/register-student',data)

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

export const StudentLogin = (async (data) => {
    try {

        let resdata = await axios.post('/student-login',data)

        return {
            result: resdata.data.result,
            success: resdata.data.success,
            token: resdata.data.token,
            errors : resdata.data.errors,

        }
    } catch (err) {
        alert(err)
        return {
            result: [],
            success: false,
            err: err
        }
    }
})

export const tranierLogin = (async (data) => {
    try {

        let resdata = await axios.post('/trainer-login',data)

        return {
            result: resdata.data.result,
            success: resdata.data.success,
            token: resdata.data.token,
            errors : resdata.data.errors,

        }
    } catch (err) {
        alert(err)
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

export const claimRewards = (async (data) => {
    try {

        let resdata = await axios.post('/claim-rewards',data)

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

export const getstudentscroe =(async (data)=>{
    try{
    let resdata = await axios.post('/get-score',data)

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

export const getstudenthistory = (async (data) => {
    try {

        let resdata = await axios.post('/student-test-history',data)

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


