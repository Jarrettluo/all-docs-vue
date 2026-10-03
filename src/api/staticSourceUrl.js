import {GetStaticSource, GetStaticSourceWithoutToken} from "@/api/request";
import {DOC_DOWNLOAD} from "@/api/url";

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
        return GetStaticSourceWithoutToken(DOC_DOWNLOAD, param)
    }
}