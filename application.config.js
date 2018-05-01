module.exports = {
    APP_SERVER_PORT_NO : 1025,
    MONGO: {
        MONGO_URL: (process.env.MONGO_URL || 'mongodb://localhost:27017/taskboard')
    }
};