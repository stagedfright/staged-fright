export default {
	 
	container: {
	  overflow: 'hidden',
	  height: '100vh',
	  background: '#edeae8',
	  position: 'relative',
	  margin: '0', padding: '0',
	},
 
	video: {
	  position: 'absolute',
	  left: '50%', top: '50%',
	  transform: 'translate(-50%, -50%)',
	  margin: '0', padding: '0',
		},

	overlay: {
	  position: 'absolute',
	  top: '0', right: '0', left: '0', bottom: '0',
	  height: '50vh',
	  marginTop: '25vh',
	  background: 'rgba(0,0,0,0.5)',
	  lineHeight: '50vh',
	},

	overlayText: {
		color: 'white',
		lineHeight: '45vh',
		display: 'inline-block',
		verticalAlign: 'middle',
	},

	overlayTextBig: {
		fontFamily: 'Limelight, cursive',
		fontSize: '6vw',
	},

	overlayTextSmall: {
		fontFamily: 'Open Sans, sans-serif',
		fontSize: '2vw',
	}
};
