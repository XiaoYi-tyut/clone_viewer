import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const serverNameDefinitions = {
    type: String,
    label: 'Server Name',
    max: 100
};

const serverTypeDefinitions = {
    type: String,
    label: 'Server Type',
    allowedValues: ['dicomWeb', 'dimse'],
    valuesLabels: ['DICOM Web', 'DIMSE'],
    optional: true
};

const wadoUriRootDefinitions = {
    type: String,
    label: 'WADO URI root',
    max: 1000
};

export const DICOMWebRequestOptions = new SimpleSchema({
    auth: {
        type: String,
        label: 'Authentication',
        optional: true
    },
    logRequests: {
        type: Boolean,
        defaultValue: true,
        label: 'Requests'
    },
    logResponses: {
        type: Boolean,
        defaultValue: false,
        label: 'Responses'
    },
    logTiming: {
        type: Boolean,
        defaultValue: true,
        label: 'Timing'
    }
});

export const DICOMWebServer = new SimpleSchema({
    name: serverNameDefinitions,
    type: serverTypeDefinitions,
    wadoUriRoot: wadoUriRootDefinitions,
    wadoRoot: {
        type: String,
        label: 'WADO root',
        max: 1000
    },
    imageRendering: {
        type: String,
        label: 'Image rendering',
        allowedValues: ['', 'wadouri', 'orthanc'],
        valuesLabels: ['', 'WADO URI', 'ORTHANC']
    },
    qidoRoot: {
        type: String,
        label: 'QIDO root',
        max: 1000
    },
    qidoSupportsIncludeField: {
        type: Boolean,
        label: 'QIDO supports including fields',
        defaultValue: false
    },
    requestOptions: {
        type: DICOMWebRequestOptions,
        label: 'Request Options'
    }
});

export const DIMSEPeer = new SimpleSchema({
    aeTitle: {
        type: String,
        label: 'AE Title'
    },
    hostAE: {
        type: String,
        label: 'AE Host',
        optional: true
    },
    host: {
        type: String,
        label: 'Host Domain/IP',
        regEx: SimpleSchema.RegEx.WeakDomain
    },
    port: {
        type: Number,
        label: 'Port',
        min: 1,
        defaultValue: 11112,
        max: 65535
    },
    default: {
        type: Boolean,
        label: 'Default',
        defaultValue: false
    },
    server: {
        type: Boolean,
        label: 'Server',
        defaultValue: false
    },
    supportsInstanceRetrievalByStudyUid: {
        type: Boolean,
        label: 'Supports instance retrieval by StudyUid',
        defaultValue: true
    }
});

export const DIMSEServer = new SimpleSchema({
    name: serverNameDefinitions,
    type: serverTypeDefinitions,
    wadoUriRoot: wadoUriRootDefinitions,
    requestOptions: {
        type: DICOMWebRequestOptions,
        label: 'Request Options'
    },
    peers: {
        type: [DIMSEPeer],
        label: 'Peer List',
        minCount: 1
    }
});

export const UISettings = new SimpleSchema({
    studyListFunctionsEnabled: {
        type: Boolean,
        label: 'Study List Functions Enabled?',
        defaultValue: true
    },
    leftSidebarOpen: {
        type: Boolean,
        label: 'Left sidebar open by default?',
        defaultValue: false
    },
    displaySetNavigationLoopOverSeries: {
        type: Boolean,
        label: 'The UP/DOWN display set navigation buttons will start over when reach the last display set in viewport?',
        defaultValue: true
    },
    displaySetNavigationMultipleViewports: {
        type: Boolean,
        label: 'The UP/DOWN display set navigation buttons will iterate over all the viewports at once?',
        defaultValue: false
    },
    displayEchoUltrasoundWorkflow: {
        type: Boolean,
        label: 'Enable cine dialog enhancements for multiframe images.',
        defaultValue: false
    },
    autoPositionMeasurementsTextCallOuts: {
        type: String,
        label: 'Auto position text call-outs for measurements when creating them.',
        defaultValue: 'TRBL'
    }
});

export const PublicServerConfig = new SimpleSchema({
    verifyEmail: {
        type: Boolean,
        label: 'Verify Email',
        defaultValue: false
    },
    ui: {
        type: UISettings,
        label: 'UI Settings'
    }
});

export const Servers = new SimpleSchema({
    dicomWeb: {
        type: [DICOMWebServer],
        label: 'DICOMWeb Servers',
        optional: true
    },
    dimse: {
        type: [DIMSEServer],
        label: 'DIMSE Servers',
        optional: true
    }
});

export const ServerConfiguration = new SimpleSchema({
    servers: {
        type: Servers,
        label: 'Servers'
    },
    defaultServiceType: {
        type: String,
        label: 'Default Service Type',
        defaultValue: 'dicomWeb'
    },
    public: {
        type: PublicServerConfig,
        label: 'Public Server Configuration',
    },
    origin: {
        type: String,
        label: 'Origin',
        optional: true
    }
});
