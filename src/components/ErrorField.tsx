interface ErrorFieldProps { children?: string | null, style?: object }
const ErrorField: React.FC<ErrorFieldProps> = ({ children, style }) => children ? <p style={style ? style : { color: 'red', fontSize: "50%" }}>{children}</p> : null;
export default ErrorField