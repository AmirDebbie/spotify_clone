const { Router } = require("express")
const router = Router()
const { Artist, Song, Album, Playlist, Playlists_song } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// get all songs from a playlist
router.get('/:id', async (req, res) => {
    try {
        const result = await Playlists_song.findAll({
            attributes: [],
            where: {playlist_id: req.params.id},
            include: [{
                model: Song,
                attributes: ['title'],
                include: [{
                    model: Artist,
                    attributes: ['name'],
                },
                {
                    model: Album,
                    attributes: ['name'],
                },
            ]
            }]
        }
        );   
        res.json(result);
    }
    catch (e) {
        res.json({error:e.message})
    }
})

module.exports = router;