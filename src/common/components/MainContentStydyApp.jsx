export default function MainContentStudyApp({ children, id }) {
    return (
        <div id="main-content-study-app">
            <div id={id}>{children}</div>
        </div>
    );
}
