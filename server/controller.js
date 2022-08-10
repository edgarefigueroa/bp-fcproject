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
            values ('Video Game', 'Super Mario Party', 'Nintendo', 'https://m.media-amazon.com/images/I/81JrGL5rW+L._SL1500_.jpg' ),
                ('Video Game', 'MarioKart 8 Deluxe', 'Nintendo', 'https://m.media-amazon.com/images/I/81mqZx5X1XL._SL1500_.jpg' ),
                ('Video Game', 'Super Smash Bros', 'Nintendo', 'https://m.media-amazon.com/images/I/810wFm-lJBL._SL1500_.jpg' ),
                ('Video Game', 'Rayman Legends', 'Ubisoft', 'https://m.media-amazon.com/images/I/81XK3SZDFZL._SL1500_.jpg' ),
                ('Board Game', 'Jenga', 'Hasbro Gaming', 'https://m.media-amazon.com/images/I/71nVxtURtlL._AC_SL1500_.jpg'),
                ('Board Game', 'Scrabble', 'Hasbro Gaming', 'https://m.media-amazon.com/images/I/81OjLGNO5VL._AC_SL1500_.jpg'),
                ('Board Game', 'Uno', 'Mattel', 'https://m.media-amazon.com/images/I/71dSl3Q0rEL._AC_SL1500_.jpg'),
                ('Board Game', 'Connect4', 'Hasbro Gaming', 'https://m.media-amazon.com/images/I/81fEiLrmZ8L._AC_SL1500_.jpg'),
                ('Book', 'Awesome Engineering Activities for Kids', 'Christina Schul', 'https://images-na.ssl-images-amazon.com/images/I/51dZ77mnZOL._SX469_BO1,204,203,200_.jpg'),
                ('Book', 'National Geographic Little Kids First Big Book of Dinosaurs', 'Catherine Hughes', 'https://images-na.ssl-images-amazon.com/images/I/51wg4H6stJL._SY498_BO1,204,203,200_.jpg'),
                ('Book', 'Learn to Draw Animals!', 'Peter Pauper Press', 'https://images-na.ssl-images-amazon.com/images/I/515YB3wd+zL._SX380_BO1,204,203,200_.jpg'),
                ('Book', 'The Backyard Bug Book for Kids: Storybook, Insect Facts, and Activities ', 'Lauren Davidson', 'https://images-na.ssl-images-amazon.com/images/I/61tWff7nSNL._SY494_BO1,204,203,200_.jpg');
            

        
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    // retrive all media
    getMedia: (req,res) => {
        sequelize.query(`SELECT * FROM media;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error getMedia',err))
    },

    //retrive video games
    getVideoGames: (req,res) =>{
        sequelize.query(`SELECT * FROM media
        WHERE media_type = 'Video Game';`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error getMedia',err))
    },

     //retrive board games
     getBoardGames: (req,res) =>{
        sequelize.query(`SELECT * FROM media
        WHERE media_type = 'Board Game';`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error getMedia',err))
    },

     //retrive books
     getBooks: (req,res) =>{
        sequelize.query(`SELECT * FROM media
        WHERE media_type = 'Book';`)
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

    deleteMedia: (req, res) => {
        let { id } = req.params;
        sequelize.query(`DELETE FROM media 
        WHERE media_id = ${id}`)
        .then((dbRes) => res.status(200).send(dbRes[0]))
        .catch((err) => console.log('error deleteMedia',err));
    },
}