import Users from "../modals/userModal.js"

export const isLogin = async (req, res, next) => {
    try {
        if (req.session.user_id) { }
        else {
            res.redirect('/')
        }
        next()
    } catch (err) {
        return res.send(err)
    }
}

export const isLogout = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            const user = await Users.findOne({ _id: req.session.user_id }).exec();
            if (user.role == 'Admin') {
                res.redirect('/adminDashboard')
            } else {
                res.redirect('/votingPage')
            }
        }
        next()
    } catch (err) {
        return res.send(err)
    }
}

export const isUserLogin = async (req, res, next) => {
    try {
        const user = await Users.findById({_id: req.session.user_id}).exec();
        if (user.role == 'Voter') { 
           
        }
        else {
            res.redirect('/')
        }
        next()
    } catch (err) {
        return res.send(err)
    }
}

export const isAdminLogin = async (req, res, next) => {
    try {
        const user = await Users.findById({_id: req.session.user_id}).exec();
        if (user.role == 'Admin') { 
           
        }
        else {
            res.redirect('/')
        }
        next()
    } catch (err) {
        return res.send(err)
    }
}
