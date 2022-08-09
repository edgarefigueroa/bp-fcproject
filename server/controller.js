require("dotenv").config();
const { DATABASE_URL } = process.env
const Sequelize = require('sequelize')
const axios = require("axios");

// new Sequelize instance, passing in your connection string and an object
const sequelize = new Sequelize(DATABASE_URL,{
    dialect:'postgres',
    dialectOptions : {
        ssl: {
            rejectUnauthorized:false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists media;

            create table media (
                media_id serial primary key, 
                media_type varchar,
                media_name varchar,
                media_creator varchar,
                media_img varchar
            );

            insert into media (media_type, media_name, media_creator, media_img)
            values ('Video Game', 'Super Mario Party', 'Nintendo', 'https://m.media-amazon.com/images/I/81JrGL5rW+L._SL1500_.jpg' );
            

        
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getMedia: (req,res) => {
        sequelize.query(`SELECT * FROM media;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error getMedia',err))
    },

    createMedia: (req, res) => {
        let { mediaType, mediaName, mediaCreator, mediaImg } = req.body;
        sequelize.query(`INSERT INTO media (media_type, media_name, media_creator, media_img) 
        VALUES ('${mediaType}','${mediaName}','${mediaCreator}','${mediaImg}'); `)
        .then((dbRes) => res.status(200).send(dbRes[0]))
        .catch((err) => console.log('error createCity',err));
    },

    // getCities: (req,res) => {
    //     sequelize.query(`SELECT c1.city_id, c1.name as city, c1.rating, c2.country_id, c2.name AS country
    //     FROM cities AS c1
    //     JOIN countries AS c2
    //     ON c2.country_id = c1.country_id
    //     ORDER BY c1.rating DESC;`)
    //     .then(dbRes => res.status(200).send(dbRes[0]))
    //     .catch(err => console.log('error getCities',err))
    // },  

    // deleteCity: (req, res) => {
    //     let { id } = req.params;
    //     sequelize.query(`DELETE FROM cities 
    //     WHERE city_id = ${id}`)
    //     .then((dbRes) => res.status(200).send(dbRes[0]))
    //     .catch((err) => console.log('error deleteCity',err));
    // },
}