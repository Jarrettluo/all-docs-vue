import {GetStaticSource, GetStaticSourceWithoutToken} from "@/api/request";

const DOC_PREVIEW_URL = '/file/view/';

const IMAGE_URL = '/file/image2/'


export default {

    docPreviewUrl: (param) => {
        return GetStaticSource(DOC_PREVIEW_URL, param);
    },

    imageUrl: (param) => {
        return GetStaticSource(IMAGE_URL, param);
    },

    downloadFileUrl: (param) => {
        return GetStaticSourceWithoutToken("/api/v1/file/", param)
    }
}