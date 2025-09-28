import Input from "./Input";
import Switch from "./Switch";

const AuthFormikControl = props => {
	switch (props.control) {
		case 'input':
			return <Input {...props} />;
    case 'switch':
      return <Switch {...props} />
		// case 'radio':
		//     return <Radio {...props}/>
		// case 'date':
		//     return <Date {...props}/>
		// case 'file':
		//     return <File {...props}/>
		default:
			return null;
	}
};

export default AuthFormikControl;
