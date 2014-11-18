
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (DynamicFileIncluder == null) var DynamicFileIncluder = {};
DynamicFileIncluder._path = '/AHAECC/dwr';
DynamicFileIncluder.getInclude = function(p0, callback) {
  dwr.engine._execute(DynamicFileIncluder._path, 'DynamicFileIncluder', 'getInclude', p0, callback);
}
