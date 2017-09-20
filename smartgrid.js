var smartgrid = require('smart-grid');
 
/* It's principal settings in smart grid project */
var settings = {
    oldSizeStyle: false,
    outputStyle: 'styl', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '15px' /* side fields */
    }
};
 
smartgrid('./src/styl/lib', settings);