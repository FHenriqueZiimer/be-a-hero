const connection = require('../database/connection');
const catchAsync= require('../utils/catchAsync');

createIncident = catchAsync(async(req, res) => {
  const { title, description, value } = req.body;
  const user_id = req.headers.authorization;

  const [id] = await connection('incidents').insert({
    title,
    description,
    value,
    user_id,
  });

  return res.json({ id });
  })

getIncidents = catchAsync(async(req, res) => {
    const { page = 1 } = req.query;
		const [count] = await connection('incidents').count();

		res.header('X-Total-Count', count['count(*)']);

		return res.json(
			await connection('incidents')
				.join('user', 'user.id', '=', 'incidents.user_id')
				.limit(5)
				.offset((page - 1) * 5)
				.select([
					'incidents.*',
					'user.name',
					'user.email',
					'user.number',
					'user.city',
					'user.uf',
				])
		);
})

deleteIncident = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user_id = req.headers.authorization;
  const incident = await connection('incidents')
    .where('id', id)
    .select('user_id', 'id')
    .first();

  if (incident.user_id !== user_id) {
    return res.status(401).json({ error: 'Operação Negada!' });
  }

  await connection('incidents').where('id', id).delete();

  return res.status(204).send();
}),

module.exports = {
  createIncident,
  getIncidents,
  deleteIncident
}