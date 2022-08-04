const Ofn = require( '../index' );
const fsExtra = require( 'fs-extra' );

describe('fn: obtainOroConfig', () => {
    test( 'fn: obtainOroConfig( undefined )' , async () => {
        let obtainingConfig = await Ofn.obtainOroConfig();
        obtainingConfig.error.msg = obtainingConfig.error.msg.substr( 0, obtainingConfig.error.msg.indexOf( ' on' ) + 3 );

        expect( obtainingConfig ).toEqual( {
            status: false,
            error: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: 'oro-config.json',
                msg: 'Miss param:environment on'
            }
        } );
    } );

    test( 'fn: obtainOroConfig( str )' , async () => {
        expect( await Ofn.obtainOroConfig( 'chacho' ) ).toEqual( {
            status: false,
            error: { msg: 'Ofn.obtainOroConfig args failed: must be an object.', args: 'chacho' }
        } );
    } );

    test( 'fn: obtainOroConfig( { file } } )' , async () => {
        let obtainingConfig = await Ofn.obtainOroConfig( { file: `${__dirname}/examples/prj1/oro-config.json` } );

        expect( obtainingConfig ).toEqual( {
            status: false,
            error: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: `${__dirname}/examples/prj1/oro-config.json`,
                msg: `Miss param:projectserver on ${Ofn.sanitizePath(__dirname)}/examples/prj1/oro-config.json deep 0`
            }
        } );
    } );

    test( 'fn: obtainOroConfig( { file, deep 1 } )' , async () => {
        let obtainingConfig = await Ofn.obtainOroConfig( { file: `${__dirname}/examples/prj1/oro-config.json`, deep: 1 } );

        expect( obtainingConfig ).toEqual( {
            status: true,
            config: {
                environment: 'PRO',
                projectname: 'test-project',
                projectserver: 'test-server'
            }
        } );
    } );

    test( 'fn: obtainOroConfig( { file custom, deep 1, defaultParams } )' , async () => {
        let obtainingConfig = await Ofn.obtainOroConfig(
            { file: `${__dirname}/examples/prj1/custom-config.json`, deep: 1, defaultParams: [ 'environment' ] } );

        expect( obtainingConfig ).toEqual( {
            status: true,
            config: {
                environment: 'DEV',
                custom: { chacho: true, tio: true }
            }
        } );
    } );

    test( 'fn: obtainOroConfig( { file custom, deep 1, defaultParams none } )' , async () => {
        let obtainingConfig = await Ofn.obtainOroConfig(
            { file: `${__dirname}/examples/prj1/oro-config.json`, deep: 1, extraParams: [ 'custom' ] } );

        expect( obtainingConfig ).toEqual( {
            status: false,
            error: {
                deep: 1,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [ 'custom' ],
                file: `${__dirname}/examples/prj1/oro-config.json`,
                msg: `Miss param:custom on ${Ofn.sanitizePath(__dirname)}/examples/prj1/oro-config.json deep 1`
            }
        } );
    } );
});

describe('fn: obtainOroConfigSync', () => {
    test( 'fn: obtainOroConfigSync( undefined )' , () => {
        let obtainingConfig = Ofn.obtainOroConfigSync();
        obtainingConfig.error.msg = obtainingConfig.error.msg.substr( 0, obtainingConfig.error.msg.indexOf( ' on' ) + 3 );

        expect( obtainingConfig ).toEqual( {
            status: false,
            error: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: 'oro-config.json',
                msg: 'Miss param:environment on'
            }
        } );
    } );

    test( 'fn: obtainOroConfigSync( str )' , () => {
        expect( Ofn.obtainOroConfigSync( 'chacho' ) ).toEqual( {
            status: false,
            error: { msg: 'Ofn.obtainOroConfigSync args failed: must be an object.', args: 'chacho' }
        } );
    } );

    test( 'fn: obtainOroConfigSync( { file } } )' , () => {
        let obtainingConfig = Ofn.obtainOroConfigSync( { file: `${__dirname}/examples/prj1/oro-config.json` } );

        expect( obtainingConfig ).toEqual( {
            status: false,
            error: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: `${__dirname}/examples/prj1/oro-config.json`,
                msg: `Miss param:projectserver on ${Ofn.sanitizePath(__dirname)}/examples/prj1/oro-config.json deep 0`
            }
        } );
    } );

    test( 'fn: obtainOroConfigSync( { file, deep 1 } )' , () => {
        let obtainingConfig = Ofn.obtainOroConfigSync( { file: `${__dirname}/examples/prj1/oro-config.json`, deep: 1 } );

        expect( obtainingConfig ).toEqual( {
            status: true,
            config: {
                environment: 'PRO',
                projectname: 'test-project',
                projectserver: 'test-server'
            }
        } );
    } );

    test( 'fn: obtainOroConfigSync( { file custom, deep 1, defaultParams } )' , () => {
        let obtainingConfig = Ofn.obtainOroConfigSync(
            { file: `${__dirname}/examples/prj1/custom-config.json`, deep: 1, defaultParams: [ 'environment' ] } );

        expect( obtainingConfig ).toEqual( {
            status: true,
            config: {
                environment: 'DEV',
                custom: { chacho: true, tio: true }
            }
        } );
    } );

    test( 'fn: obtainOroConfigSync( { file custom, deep 1, defaultParams none } )' , () => {
        let obtainingConfig = Ofn.obtainOroConfigSync(
            { file: `${__dirname}/examples/prj1/oro-config.json`, deep: 1, extraParams: [ 'custom' ] } );

        expect( obtainingConfig ).toEqual( {
            status: false,
            error: {
                deep: 1,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [ 'custom' ],
                file: `${__dirname}/examples/prj1/oro-config.json`,
                msg: `Miss param:custom on ${Ofn.sanitizePath(__dirname)}/examples/prj1/oro-config.json deep 1`
            }
        } );
    } );
});

describe('fn: getFileJsonRecursively', () => {
    test( 'fn: getFileJsonRecursively( undefined )' , async () => {
        expect( await Ofn.getFileJsonRecursively() ).toEqual( {} );
    } );

    test( 'fn: getFileJsonRecursively( not str )' , async () => {
        expect( await Ofn.getFileJsonRecursively( [] ) ).toEqual( {} );
    } );

    test( 'fn: getFileJsonRecursively( path )' , async () => {
        expect( await Ofn.getFileJsonRecursively( `${__dirname}/examples/prj1/custom-config.json` ) )
            .toEqual( { custom: { tio: true } } );
    } );

    test( 'fn: getFileJsonRecursively( path, deep bad )' , async () => {
        expect( await Ofn.getFileJsonRecursively( `${__dirname}/examples/prj1/custom-config.json`, true ) )
            .toEqual( { custom: { tio: true } } );
    } );

    test( 'fn: getFileJsonRecursively( path, deep )' , async () => {
        expect( await Ofn.getFileJsonRecursively( `${__dirname}/examples/prj1/custom-config.json`, 2 ) )
            .toEqual( { environment: 'DEV', custom: { chacho: true, tio: true } } );
    } );
});

describe('fn: getFileJsonRecursivelySync', () => {
    test( 'fn: getFileJsonRecursivelySync( undefined )' , () => {
        expect( Ofn.getFileJsonRecursivelySync() ).toEqual( {} );
    } );
    test( 'fn: getFileJsonRecursivelySync( not str )' , () => {
        expect( Ofn.getFileJsonRecursivelySync( [] ) ).toEqual( {} );
    } );
    test( 'fn: getFileJsonRecursivelySync( path )' , () => {
        expect( Ofn.getFileJsonRecursivelySync( `${__dirname}/examples/prj1/custom-config.json` ) )
            .toEqual( { custom: { tio: true } } );
    } );
    test( 'fn: getFileJsonRecursivelySync( path, deep bad )' , () => {
        expect( Ofn.getFileJsonRecursivelySync( `${__dirname}/examples/prj1/custom-config.json`, true ) )
            .toEqual( { custom: { tio: true } } );
    } );
    test( 'fn: getFileJsonRecursivelySync( path, deep )' , () => {
        expect( Ofn.getFileJsonRecursivelySync( `${__dirname}/examples/prj1/custom-config.json`, 2 ) )
            .toEqual( { environment: 'DEV', custom: { chacho: true, tio: true } } );
    } );
});

describe('fn: globFiles', () => {
    test( 'fn: globFiles( undefined )' , async () => {
        expect( await Ofn.globFiles() ).toEqual( [] );
    } );
    test( 'fn: globFiles( not str )' , async () => {
        expect( await Ofn.globFiles( true ) ).toEqual( [] );
    } );
    test( 'fn: globFiles( folderpath )' , async () => {
        expect( await Ofn.globFiles( `${__dirname}/examples/*` ) ).toEqual( [
            `${Ofn.sanitizePath( __dirname )}/examples/custom-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/oro-config.json`
        ] );
    } );
    test( 'fn: globFiles( folderpath )' , async () => {
        expect( await Ofn.globFiles( `${__dirname}/examples/**` ) ).toEqual( [
            `${Ofn.sanitizePath( __dirname )}/examples/custom-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/oro-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/prj1/.gitignore`,
            `${Ofn.sanitizePath( __dirname )}/examples/prj1/custom-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/prj1/oro-config.json`
        ] );
    } );
    test( 'fn: globFiles( folderpath, onlyFiles none )' , async () => {
        expect( await Ofn.globFiles( `${__dirname}/examples/*`, { onlyFiles: false } ) ).toEqual( [
            `${Ofn.sanitizePath( __dirname )}/examples/custom-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/oro-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/prj1`
        ] );
    } );
    test( 'fn: globFiles( folderpath, onlyDirectories )' , async () => {
        expect( await Ofn.globFiles( `${__dirname}/examples/*`, { onlyFiles: false, onlyDirectories: true } ) ).toEqual( [
            `${Ofn.sanitizePath( __dirname )}/examples/prj1`
        ] );
    } );
    test( 'fn: globFiles( folderpath array )' , async () => {
        expect( await Ofn.globFiles( [ `${__dirname}/examples/*`, `${__dirname}/examples/prj1/*` ] ) ).toEqual( [
            `${Ofn.sanitizePath( __dirname )}/examples/custom-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/oro-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/prj1/.gitignore`,
            `${Ofn.sanitizePath( __dirname )}/examples/prj1/custom-config.json`,
            `${Ofn.sanitizePath( __dirname )}/examples/prj1/oro-config.json`
        ] );
    } );
});

describe('fn: pathIsFolder', () => {
    test( 'fn: pathIsFolder( undefined )' , async () => {
        expect( await Ofn.pathIsFolder() ).toBe( false );
    } );
    test( 'fn: pathIsFolder( str bad )' , async () => {
        expect( await Ofn.pathIsFolder( 'chacho' ) ).toBe( false );
    } );
    test( 'fn: pathIsFolder( folderpath )' , async () => {
        expect( await Ofn.pathIsFolder( `${__dirname}/examples` ) ).toBe( true );
    } );
    test( 'fn: pathIsFolder( folderpath2 )' , async () => {
        expect( await Ofn.pathIsFolder( `${__dirname}/examples/` ) ).toBe( true );
    } );
    test( 'fn: pathIsFolder( filepath )' , async () => {
        expect( await Ofn.pathIsFolder( `${__dirname}/examples/oro-config.json` ) ).toBe( false );
    } );
});

describe('fn: folderIsEmpty', () => {
    test( 'fn: folderIsEmpty( undefined )' , async () => {
        expect( await Ofn.folderIsEmpty() ).toBe( null );
    } );
    test( 'fn: folderIsEmpty( not str )' , async () => {
        expect( await Ofn.folderIsEmpty( true ) ).toBe( null );
    } );
    test( 'fn: folderIsEmpty( folderpath )' , async () => {
        expect( await Ofn.folderIsEmpty( `${__dirname}/examples/*` ) ).toBe( false );
    } );
    test( 'fn: folderIsEmpty( folderpath )' , async () => {
        expect( await Ofn.folderIsEmpty( `${__dirname}/examples/*`, { ignore: [ '**.json' ] } ) ).toBe( true );
    } );
});

describe('fn: zipFolder', () => {
    test( 'fn: zipFolder( undefined )' , async () => {
        expect( await Ofn.zipFolder() ).toEqual(
            { status: false, error: { msg: 'Ofn.zipFolder failed, param:folderPath is string required.' } } );
    } );
    test( 'fn: zipFolder( undefined )' , async () => {
        let folderPath = `${Ofn.sanitizePath( __dirname )}/examples/prj99`;
        expect( await Ofn.zipFolder( folderPath, true ) ).toEqual(
            { status: false, error: { msg: 'Ofn.zipFolder failed, param:zipPath is string required.' } } );
    } );
    test( 'fn: zipFolder( str bad )' , async () => {
        let folderPath = `${Ofn.sanitizePath( __dirname )}/examples/prj99`;
        expect( await Ofn.zipFolder( folderPath ) ).toEqual(
            { status: false, error: { msg: 'Ofn.zipFolder failed, folderPath not exist.', folderPath } } );
    } );
    test( 'fn: zipFolder( folderpath )' , async () => {
        let folderPath = `${Ofn.sanitizePath( __dirname )}/examples/prj1`;
        expect( await Ofn.zipFolder( folderPath ) ).toEqual(
            { status: true, zipPath: `${Ofn.sanitizePath( __dirname )}/examples/prj1.zip` } );
        await fsExtra.remove( `${Ofn.sanitizePath( __dirname )}/examples/prj1.zip` );
    } );
    test( 'fn: zipFolder( folderpath, zipPath self )' , async () => {
        let folderPath = `${Ofn.sanitizePath( __dirname )}/examples/prj1/`;
        let zipPath = `${Ofn.sanitizePath( __dirname )}/examples/prj1/prj.zip`;
        expect( await Ofn.zipFolder( folderPath, zipPath ) ).toEqual(
            { status: false, error: { msg: 'Ofn.zipFolder Error: Source and target folder must be different.', folderPath, zipPath } } );
    } );
    test( 'fn: zipFolder( folderpath, zipPath )' , async () => {
        let folderPath = `${Ofn.sanitizePath( __dirname )}/examples/prj1`;
        let zipPath = `${Ofn.sanitizePath( __dirname )}/examples/prj.zip`;
        expect( await Ofn.zipFolder( folderPath, zipPath ) ).toEqual( { status: true, zipPath } );
        await fsExtra.remove( zipPath );
    } );
    test( 'fn: zipFolder( filepath )' , async () => {
        let folderPath = `${Ofn.sanitizePath( __dirname )}/examples/oro-config.json`;
        expect( await Ofn.zipFolder( folderPath ) ).toEqual(
            { status: true, zipPath: `${Ofn.sanitizePath( __dirname )}/examples/oro-config.json.zip` } );
        await fsExtra.remove( `${Ofn.sanitizePath( __dirname )}/examples/oro-config.json.zip` );
    } );
});