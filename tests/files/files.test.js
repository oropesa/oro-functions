const Ofn = require( '../../index' );
const fsExtra = require( 'fs-extra' );

const TEST_PATH = Ofn.getFolderByPath( __dirname );

describe( 'fn: obtainOConfig', () => {
    test( 'fn: obtainOConfig( undefined )', async() => {
        let obtainingConfig = await Ofn.obtainOConfig();

        expect( obtainingConfig.status ).toBe( false );

        if( obtainingConfig.status === true ) {
            return;
        }

        obtainingConfig.error.msg = obtainingConfig.error.msg.slice( 0, obtainingConfig.error.msg.indexOf( ' on' ) + 3 );

        expect( obtainingConfig.error ).toEqual( {
            msg: 'Miss param:environment on',
            args: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: 'oro-config.json',
            }
        } );
    } );

    test( 'fn: obtainOConfig( str )', async() => {
        expect( await Ofn.obtainOConfig( 'chacho' ) ).toEqual( {
            status: false,
            error: { msg: 'obtainOConfig args failed: must be an object.', args: 'chacho' }
        } );
    } );

    test( 'fn: obtainOConfig( { file } } )', async() => {
        let obtainingConfig = await Ofn.obtainOConfig( {
            file: `${TEST_PATH}/-assets/prj1/oro-config.json`
        } );

        expect( obtainingConfig.status ).toBe( false );

        if( obtainingConfig.status === true ) {
            return;
        }

        expect( obtainingConfig.error ).toEqual( {
            msg: `Miss param:projectserver on ${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/oro-config.json deep 0`,
            args: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            }
        } );
    } );

    test( 'fn: obtainOConfig( { file, deep 1 } )', async() => {
        let obtainingConfig = await Ofn.obtainOConfig( {
            file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            deep: 1
        } );

        expect( obtainingConfig.status ).toBe( true );

        if( obtainingConfig.status === false ) {
            return;
        }

        expect( obtainingConfig.config ).toEqual( {
            environment: 'PRO',
            projectname: 'test-project',
            projectserver: 'test-server'
        } );
    } );

    test( 'fn: obtainOConfig( { file custom, deep 1, defaultParams } )', async() => {
        let obtainingConfig = await Ofn.obtainOConfig( {
            file: `${TEST_PATH}/-assets/prj1/custom-config.json`,
            deep: 1,
            defaultParams: [ 'environment' ]
        } );

        expect( obtainingConfig.status ).toBe( true );

        if( obtainingConfig.status === false ) {
            return;
        }

        expect( obtainingConfig.config ).toEqual( {
            environment: 'DEV',
            custom: { chacho: true, tio: true }
        } );
    } );

    test( 'fn: obtainOConfig( { file custom, deep 1, defaultParams none } )', async() => {
        let obtainingConfig = await Ofn.obtainOConfig( {
            file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            deep: 1,
            extraParams: [ 'custom' ]
        } );

        expect( obtainingConfig.status ).toBe( false );

        if( obtainingConfig.status === true ) {
            return;
        }

        expect( obtainingConfig.error ).toEqual( {
            msg: `Miss param:custom on ${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/oro-config.json deep 1`,
            args: {
                deep: 1,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [ 'custom' ],
                file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            }
        } );
    } );
} );

describe( 'fn: obtainOConfigSync', () => {
    test( 'fn: obtainOConfigSync( undefined )', () => {
        let obtainingConfig = Ofn.obtainOConfigSync();

        expect( obtainingConfig.status ).toBe( false );

        if( obtainingConfig.status === true ) {
            return;
        }

        obtainingConfig.error.msg = obtainingConfig.error.msg.slice(
            0,
            obtainingConfig.error.msg.indexOf( ' on' ) + 3
        );

        expect( obtainingConfig.error ).toEqual( {
            msg: 'Miss param:environment on',
            args: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: 'oro-config.json',
            }
        } );
    } );

    test( 'fn: obtainOConfigSync( str )', () => {
        expect( Ofn.obtainOConfigSync( 'chacho' ) ).toEqual( {
            status: false,
            error: { msg: 'obtainOConfigSync args failed: must be an object.', args: 'chacho' }
        } );
    } );

    test( 'fn: obtainOConfigSync( { file } } )', () => {
        let obtainingConfig = Ofn.obtainOConfigSync( {
            file: `${TEST_PATH}/-assets/prj1/oro-config.json`
        } );

        expect( obtainingConfig.status ).toBe( false );

        if( obtainingConfig.status === true ) {
            return;
        }

        expect( obtainingConfig.error ).toEqual( {
            msg: `Miss param:projectserver on ${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/oro-config.json deep 0`,
            args: {
                deep: 0,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [],
                file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            }
        } );
    } );

    test( 'fn: obtainOConfigSync( { file, deep 1 } )', () => {
        let obtainingConfig = Ofn.obtainOConfigSync( {
            file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            deep: 1
        } );

        expect( obtainingConfig.status ).toBe( true );

        if( obtainingConfig.status === false ) {
            return;
        }

        expect( obtainingConfig.config ).toEqual( {
            environment: 'PRO',
            projectname: 'test-project',
            projectserver: 'test-server'
        } );
    } );

    test( 'fn: obtainOConfigSync( { file custom, deep 1, defaultParams } )', () => {
        let obtainingConfig = Ofn.obtainOConfigSync( {
            file: `${TEST_PATH}/-assets/prj1/custom-config.json`,
            deep: 1,
            defaultParams: [ 'environment' ]
        } );

        expect( obtainingConfig.status ).toBe( true );

        if( obtainingConfig.status === false ) {
            return;
        }

        expect( obtainingConfig.config ).toEqual( {
            environment: 'DEV',
            custom: { chacho: true, tio: true }
        } );
    } );

    test( 'fn: obtainOConfigSync( { file custom, deep 1, defaultParams none } )', () => {
        let obtainingConfig = Ofn.obtainOConfigSync( {
            file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            deep: 1,
            extraParams: [ 'custom' ]
        } );

        expect( obtainingConfig.status ).toBe( false );

        if( obtainingConfig.status === true ) {
            return;
        }

        expect( obtainingConfig.error ).toEqual( {
            msg: `Miss param:custom on ${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/oro-config.json deep 1`,
            args: {
                deep: 1,
                defaultParams: [ 'environment', 'projectname', 'projectserver' ],
                extraParams: [ 'custom' ],
                file: `${TEST_PATH}/-assets/prj1/oro-config.json`,
            }
        } );
    } );
} );

describe( 'fn: getFileJsonRecursively', () => {
    test( 'fn: getFileJsonRecursively( undefined )', async() => {
        expect( await Ofn.getFileJsonRecursively() ).toEqual( {} );
    } );

    test( 'fn: getFileJsonRecursively( not str )', async() => {
        expect( await Ofn.getFileJsonRecursively( [] ) ).toEqual( {} );
    } );

    test( 'fn: getFileJsonRecursively( path )', async() => {
        const json = await Ofn.getFileJsonRecursively( `${TEST_PATH}/-assets/prj1/custom-config.json` );
        expect( json ).toEqual( { custom: { tio: true } } );
    } );

    test( 'fn: getFileJsonRecursively( path, deep bad )', async() => {
        const json = await Ofn.getFileJsonRecursively( `${TEST_PATH}/-assets/prj1/custom-config.json`, true );
        expect( json ).toEqual( { custom: { tio: true } } );
    } );

    test( 'fn: getFileJsonRecursively( path, deep )', async() => {
        const json = await Ofn.getFileJsonRecursively( `${TEST_PATH}/-assets/prj1/custom-config.json`, 2 );
        expect( json ).toEqual( { environment: 'DEV', custom: { chacho: true, tio: true } } );
    } );
} );

describe( 'fn: getFileJsonRecursivelySync', () => {
    test( 'fn: getFileJsonRecursivelySync( undefined )', () => {
        expect( Ofn.getFileJsonRecursivelySync() ).toEqual( {} );
    } );
    test( 'fn: getFileJsonRecursivelySync( not str )', () => {
        expect( Ofn.getFileJsonRecursivelySync( [] ) ).toEqual( {} );
    } );
    test( 'fn: getFileJsonRecursivelySync( path )', () => {
        const json = Ofn.getFileJsonRecursivelySync( `${TEST_PATH}/-assets/prj1/custom-config.json` );
        expect( json ).toEqual( { custom: { tio: true } } );
    } );
    test( 'fn: getFileJsonRecursivelySync( path, deep bad )', () => {
        const json = Ofn.getFileJsonRecursivelySync( `${TEST_PATH}/-assets/prj1/custom-config.json`, true );
        expect( json ).toEqual( { custom: { tio: true } } );
    } );
    test( 'fn: getFileJsonRecursivelySync( path, deep )', () => {
        const json = Ofn.getFileJsonRecursivelySync( `${TEST_PATH}/-assets/prj1/custom-config.json`, 2 );
        expect( json ).toEqual( { environment: 'DEV', custom: { chacho: true, tio: true } } );
    } );
} );

describe( 'fn: globFiles', () => {
    test( 'fn: globFiles( undefined )', async() => {
        expect( await Ofn.globFiles() ).toEqual( [] );
    } );
    test( 'fn: globFiles( not str )', async() => {
        expect( await Ofn.globFiles( true ) ).toEqual( [] );
    } );
    test( 'fn: globFiles( folderpath )', async() => {
        expect( await Ofn.globFiles( `${TEST_PATH}/-assets/*` ) ).toEqual( [
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/custom-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/oro-config.json`
        ] );
    } );
    test( 'fn: globFiles( folderpath )', async() => {
        expect( await Ofn.globFiles( `${TEST_PATH}/-assets/**` ) ).toEqual( [
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/custom-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/oro-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/.gitignore`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/custom-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/oro-config.json`
        ] );
    } );
    test( 'fn: globFiles( folderpath, onlyFiles none )', async() => {
        expect(
            await Ofn.globFiles( `${TEST_PATH}/-assets/*`, { onlyFiles: false } )
        ).toEqual( [
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/custom-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/oro-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1`
        ] );
    } );
    test( 'fn: globFiles( folderpath, onlyDirectories )', async() => {
        expect(
            await Ofn.globFiles(
                `${TEST_PATH}/-assets/*`,
                {
                    onlyFiles: false, onlyDirectories: true
                }
            )
        ).toEqual( [
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1`
        ] );
    } );
    test( 'fn: globFiles( folderpath array )', async() => {
        expect(
            await Ofn.globFiles( [ `${TEST_PATH}/-assets/*`, `${TEST_PATH}/-assets/prj1/*` ] )
        ).toEqual( [
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/custom-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/oro-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/.gitignore`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/custom-config.json`,
            `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/oro-config.json`
        ] );
    } );
} );

describe( 'fn: pathIsFolder', () => {
    test( 'fn: pathIsFolder( undefined )', async() => {
        expect( await Ofn.pathIsFolder() ).toBe( false );
    } );
    test( 'fn: pathIsFolder( str bad )', async() => {
        expect( await Ofn.pathIsFolder( 'chacho' ) ).toBe( false );
    } );
    test( 'fn: pathIsFolder( folderpath )', async() => {
        expect( await Ofn.pathIsFolder( `${TEST_PATH}/-assets` ) ).toBe( true );
    } );
    test( 'fn: pathIsFolder( folderpath2 )', async() => {
        expect( await Ofn.pathIsFolder( `${TEST_PATH}/-assets/` ) ).toBe( true );
    } );
    test( 'fn: pathIsFolder( filepath )', async() => {
        expect( await Ofn.pathIsFolder( `${TEST_PATH}/-assets/oro-config.json` ) ).toBe( false );
    } );
} );

describe( 'fn: folderIsEmpty', () => {
    test( 'fn: folderIsEmpty( undefined )', async() => {
        expect( await Ofn.folderIsEmpty() ).toBe( null );
    } );
    test( 'fn: folderIsEmpty( not str )', async() => {
        expect( await Ofn.folderIsEmpty( true ) ).toBe( null );
    } );
    test( 'fn: folderIsEmpty( folderpath )', async() => {
        expect( await Ofn.folderIsEmpty( `${TEST_PATH}/-assets/*` ) ).toBe( false );
    } );
    test( 'fn: folderIsEmpty( folderpath, args )', async() => {
        expect(
            await Ofn.folderIsEmpty( `${TEST_PATH}/-assets/*`, { ignore: [ '**.json' ] } )
        ).toBe( true );
    } );
} );

describe( 'fn: zipFolder', () => {
    test( 'fn: zipFolder( undefined )', async() => {
        expect( await Ofn.zipFolder() ).toEqual( {
            status: false,
            error: { msg: 'zipFolder failed, param:folderPath is string required.' }
        } );
    } );
    test( 'fn: zipFolder( undefined )', async() => {
        let folderPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj99`;
        expect( await Ofn.zipFolder( folderPath, true ) ).toEqual( {
            status: false,
            error: { msg: 'zipFolder failed, param:zipPath is string required.' }
        } );
    } );
    test( 'fn: zipFolder( str bad )', async() => {
        let folderPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj99`;
        expect( await Ofn.zipFolder( folderPath ) ).toEqual( {
            status: false,
            error: { msg: 'zipFolder failed, folderPath not exist.', folderPath }
        } );
    } );
    test( 'fn: zipFolder( folderpath )', async() => {
        let folderPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1`;
        expect( await Ofn.zipFolder( folderPath ) ).toEqual( {
            status: true,
            zipPath: `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1.zip`
        } );
        await fsExtra.remove( `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1.zip` );
    } );
    test( 'fn: zipFolder( folderpath, zipPath self )', async() => {
        let folderPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/`;
        let zipPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1/prj.zip`;
        expect( await Ofn.zipFolder( folderPath, zipPath ) ).toEqual( {
            status: false,
            error: { msg: 'zipFolder Error: Source and target folder must be different.', folderPath, zipPath }
        } );
    } );
    test( 'fn: zipFolder( folderpath, zipPath )', async() => {
        let folderPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj1`;
        let zipPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/prj-js.zip`;
        expect( await Ofn.zipFolder( folderPath, zipPath ) ).toEqual( { status: true, zipPath } );
        await fsExtra.remove( zipPath );
    } );
    test( 'fn: zipFolder( filepath )', async() => {
        let folderPath = `${Ofn.sanitizePath( TEST_PATH )}/-assets/oro-config.json`;
        expect( await Ofn.zipFolder( folderPath ) ).toEqual(
            { status: true, zipPath: `${Ofn.sanitizePath( TEST_PATH )}/-assets/oro-config.json.zip` } );
        await fsExtra.remove( `${Ofn.sanitizePath( TEST_PATH )}/-assets/oro-config.json.zip` );
    } );
} );