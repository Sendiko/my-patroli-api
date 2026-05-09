const { Log } = require('../models');

const activityLog = async (req, res, next) => {
  // Tunggu sampai response selesai dikirim
  res.on('finish', async () => {
    try {
      const { method, originalUrl, ip, body, user } = req;
      
      // Tentukan action berdasarkan method
      let action = 'READ';
      if (method === 'POST') action = 'WRITE';
      else if (method === 'PUT' || method === 'PATCH') action = 'UPDATE';
      else if (method === 'DELETE') action = 'DELETE';

      // Tentukan table name berdasarkan URL
      let tableName = 'Unknown';
      if (originalUrl.includes('/api/barang')) tableName = 'BarangHilang';
      else if (originalUrl.includes('/api/laboratorium')) tableName = 'Laboratorium';
      else if (originalUrl.includes('/api/lokasi')) tableName = 'LokasiPenyimpanan';
      else if (originalUrl.includes('/api/kategori')) tableName = 'Kategori';
      else if (originalUrl.includes('/api/login') || originalUrl.includes('/api/register')) tableName = 'User';

      // Filter payload (hilangkan data sensitif)
      const payload = { ...body };
      if (payload.password) payload.password = '********';

      // Simpan log ke database
      await Log.create({
        userId: user ? user.id : null,
        action: action,
        tableName: tableName,
        endpoint: originalUrl,
        method: method,
        payload: JSON.stringify(payload),
        ipAddress: ip
      });
    } catch (error) {
      console.error('Error recording activity log:', error);
    }
  });

  next();
};

module.exports = activityLog;
