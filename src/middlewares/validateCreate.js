const validateCreate = (req, res, next) => {
    const { name, image, hp, attack, defense } = req.body;

    if(!name)return res.status(404).json({error: "missing name"});
    if(!image)return res.status(404).json({error: "missing image"});
    if(!hp)return res.status(404).json({error: "missing hp"});
    if(!attack)return res.status(404).json({error: "missing attack"});
    if(!defense)return res.status(404).json({error: "missing defense"});

    next(); 
};

module.exports = {
    validateCreate
}