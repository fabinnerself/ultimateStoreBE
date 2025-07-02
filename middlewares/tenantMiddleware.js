function getTenantId(req) {
    // Ejemplo: pasamos tenantId en header
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      throw new Error('Falta el identificador del inquilino (tenantId)');
    }
    return tenantId;
  }
  
  module.exports = { getTenantId };