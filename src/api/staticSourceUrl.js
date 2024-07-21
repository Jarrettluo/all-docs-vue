import {GetStaticSource} from "@/api/request";

const DOC_PREVIEW_URL2 = '/files/view2/';
const DOC_PREVIEW_URL = '/files/view/';

const IMAGE_URL = '/files/image2/'

export default {

    docPreviewUrl: (param) => {
        return GetStaticSource(DOC_PREVIEW_URL, param);
    },

    imageUrl: (param) => {
        return GetStaticSource(IMAGE_URL, param);
    }

}