/*
Middleware route to allow only authorised committee members 
*/

const committeeMember = (req, res, next) => {
    const { isCommitteeMember } = req.user;
    if (!isCommitteeMember)
        return res.status(403).send("You can't access this.");
    next();
}

module.exports = committeeMember;