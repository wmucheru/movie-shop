const Setting = require('../../models/setting');

module.exports = {

    getSettings: async (req, res) => {

        try {
            const settings = await Setting.find({});
            res.status(200).json(settings);
        }
        catch (e) {
            console.log(e)
            res.status(500).send({
                error: true,
                message: 'Could not fetch settings'
            });
        }
    },

    updateSetting: (req, res) => {
        const { settings } = req.body;

        try {
            const sObj = JSON.parse(settings);

            if (typeof sObj === 'object' && sObj.length > 0) {

                sObj.map(async (s) => {
                    const update = await Setting.findOneAndUpdate({ _id: s._id }, s);
                    console.log(update);
                });

                res.status(200).send({
                    message: 'Settings updated'
                });
            }
            else {
                res.status(400).send({
                    error: true,
                    message: 'Could not update settings'
                });
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send({
                error: true,
                message: e
            });
        }
    }
}