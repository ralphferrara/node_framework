const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB server URL and database name

async function testMongoDBConnection() {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Perform database operations here (e.g., insert, update, query)

        // Example: List the available databases
        const adminDb = client.db('admin'); // Access the 'admin' database
        const adminListDatabases = await adminDb.admin().listDatabases();
        console.log('Databases:', adminListDatabases);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        // Close the MongoDB connection when done
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Call the function to test the MongoDB connection
testMongoDBConnection();