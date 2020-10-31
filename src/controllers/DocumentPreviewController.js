export default class DocumentPreviewController {

  constructor(file) {

    this._file = file;

  }

  getPreviewData() {

    return new Promise((success, fail) => {

      switch (this._file.type) {

        case 'image/png':
          case 'image/jpeg':
            case 'image/jpg':
              case 'image/gif':
        let reader = new FileReader();
        reader.onload = e => {

          success({
            src: reader.result,
            info: this._file.name,
          });

        }
        reader.onerror = e => {

          fail(e);

        }
        reader.readAsDataURL(this._file);
        break;

        case 'application/pdf':

        break;

        default:

          fail();

      }

    });

  }

}