const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const HTTP_STATUS_BAD_REQUEST = 400;

const TaskValidation = async (req, res, next) => {
    const {
        macaddress,
        type,
        title,
        description,
        when
    } = req.body;

    if (!macaddress)
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: 'macaddress nao foi informado' });
    else if (!type)
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: 'type nao foi informado' });
    else if (!title)
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: 'tittle nao foi informado' });
    else if (!description)
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: 'description nao foi informado' });
    else if (!when)
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: 'when (data e hora) nao foi informado' });
    else {
        let exists;

        if (req.params.id) {
            exists = await TaskModel.findOne({
                '_id': { '$ne': req.params.id },
                'when': { '$eq': new Date(when) },
                'macaddress': { '$in': macaddress },
            });
        } else {
            if (isPast(new Date(when)))
                return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: 'when (data e hora) escolha uma data futura' });

            exists = await TaskModel.findOne({
                'when': { '$eq': new Date(when) },
                'macaddress': { '$in': macaddress },
            });
        }

        if (exists) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: 'Tarefa ja exite para essa data' });
        }

        next();
    }
};

module.exports = TaskValidation;