// implement your API here

const express = require('express');

const DB = require('./data/db.js')

const server = express();

server.use(express.json());

const sendUserError = (status, message, res) => {
    // This is just a helper method that we'll use for sending errors when things go wrong.
    res.status(status).json({ errorMessage: message });
    return;
};

// server.get('/', (req, res) => {
//     res.send(`
//     <h2>Blogposts</h2>
//     `)
// })

// server.get('/api/posts', async (req, res) => {
//     try {
//         const posts = await DB.find(req.query)
//         res.status(200).json(posts)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: 'Error retrieving the posts'
//         })
//     }
// })

// server.get('/api/posts/:id', async (req, res) => {
//     try {
//         const post = await DB.findById(req.params.id);

//         if (post) {
//         res.status(200).json(post);
//         } else {
//         res.status(404).json({ message: 'Post not found' });
//         }
//     } catch (error) {
//         // log error to database
//         console.log(error);
//         res.status(500).json({
//         message: 'Error retrieving the post',
//         });
//     }
// });

server.post('/api/users', (req, res) => {
    // console.log(req)
    if (req.body.name && req.body.bio) {
        try {
            const user = DB.insert(req.body);
            res.status(201).json(user);
        } catch (error) {
            // log error to database
            console.log(error);
            res.status(500).json({
            message: 'Error adding the user',
            });
        }
    }
    else {
        if (!req.body.name) sendUserError(400, 'Must provide a name', res);
        if (!req.body.bio) sendUserError(400, 'Must provide a bio', res);
    }


});

// server.delete('/api/posts/:id', async (req, res) => {
//     try {
//         const count = await DB.remove(req.params.id);
//         if (count > 0) {
//             res.status(200).json({ message: 'The post has been nuked' });
//         } else {
//             res.status(404).json({ message: 'The post could not be found' });
//         }
//     } catch (error) {
//       // log error to database
//         console.log(error);
//         res.status(500).json({
//         message: 'Error removing the hub',
//         });
//     }
// });

// server.put('/api/posts/:id', async (req, res) => {
//     try {
//       const post = await DB.update(req.params.id, req.body);
//       if (post) {
//         res.status(200).json(post);
//       } else {
//         res.status(404).json({ message: 'The hub could not be found' });
//       }
//     } catch (error) {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error updating the hub',
//       });
//     }
//   });

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
  });