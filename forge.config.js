module.exports = {
    packagerConfig: {
        appBundleId: 'com.halist.app',
        icon: 'src/icon',
        executableName: 'Halist',
        osxSign: {},
        osxNotarize: {
            tool: 'notarytool',
            appleId: 'amix@todoist.com',
            appleIdPassword: 'nvze-ezey-prng-ipwl',
            teamId: 'S3DD273774',
        }
    }
}
