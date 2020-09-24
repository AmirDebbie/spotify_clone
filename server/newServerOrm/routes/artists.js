const { Router } = require("express")
const router = Router()
const { Artist, Song, Album } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

router.get("/",async (req,res)=>{
    try {
        const artists = await Artist.findAll()
        res.json(artists)
    }
    catch (e) {
        res.json({error:e.message})
    }

})


router.get('/:id', async (req, res) => {
    try {
        const result = await Artist.findByPk(req.params.id, {
            include: [Album, Song]
        }
        );
        res.json(result);
    }
    catch (e) {
        res.json({error:e.message})
    }
})



module.exports = router;