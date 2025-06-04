npm start

> turbineresettoolapplication@0.1.0 start
> rimraf ./build && react-scripts start

npm : node:internal/modules/cjs/loader:1148
At line:1 char:1
+ npm start
+ ~~~~~~~~~
    + CategoryInfo          : NotSpecified: (node:internal/modules/cjs/loader:1148:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
  throw err;
  ^

Error: Cannot find module './util/memorize'
Require stack:
- C:\Users\223042104\Documents\TRT Git\TurbineResetToolApplication\ClientApp\node_modules\schema-utils\dist\ValidationError.js
- C:\Users\223042104\Documents\TRT Git\TurbineResetToolApplication\ClientApp\node_modules\schema-utils\dist\validate.js
- C:\Users\223042104\Documents\TRT Git\TurbineResetToolApplication\ClientApp\node_modules\schema-utils\dist\index.js
- C:\Users\223042104\Documents\TRT 
Git\TurbineResetToolApplication\ClientApp\node_modules\react-scripts\node_modules\webpack-dev-server\lib\Server.js
- C:\Users\223042104\Documents\TRT Git\TurbineResetToolApplication\ClientApp\node_modules\react-scripts\scripts\start.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1145:15)
    at Module._load (node:internal/modules/cjs/loader:986:27)
    at Module.require (node:internal/modules/cjs/loader:1233:19)
    at require (node:internal/modules/helpers:179:18)
    at Object.<anonymous> (C:\Users\223042104\Documents\TRT 
Git\TurbineResetToolApplication\ClientApp\node_modules\schema-utils\dist\ValidationError.js:7:40)
    at Module._compile (node:internal/modules/cjs/loader:1358:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)
    at Module.load (node:internal/modules/cjs/loader:1208:32)
    at Module._load (node:internal/modules/cjs/loader:1024:12)
    at Module.require (node:internal/modules/cjs/loader:1233:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'C:\\Users\\223042104\\Documents\\TRT Git\\TurbineResetToolApplication\\ClientApp\\node_modules\\schema-utils\\dist\\ValidationError.js',
    'C:\\Users\\223042104\\Documents\\TRT Git\\TurbineResetToolApplication\\ClientApp\\node_modules\\schema-utils\\dist\\validate.js',
    'C:\\Users\\223042104\\Documents\\TRT Git\\TurbineResetToolApplication\\ClientApp\\node_modules\\schema-utils\\dist\\index.js',
    'C:\\Users\\223042104\\Documents\\TRT 
Git\\TurbineResetToolApplication\\ClientApp\\node_modules\\react-scripts\\node_modules\\webpack-dev-server\\lib\\Server.js',
    'C:\\Users\\223042104\\Documents\\TRT Git\\TurbineResetToolApplication\\ClientApp\\node_modules\\react-scripts\\scripts\\start.js'
  ]
}

Node.js v20.14.0
