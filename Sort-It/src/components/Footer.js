import React from "react";

export default function Footer() {
    return (
        <footer
            className="page-footer font-small footer-fixed myfooter"
            style={{ marginTop: 10, width: "100vw" }}>
            <div
                className="footer-copyright text-center py-2"
                style={{ fontSize: 20 }}>
                © 2021 Copyright:
                <a className="footer-link" href="https://www.brianbastanza.me">
                    {" "}
                    brianbastanza.me
                </a>
            </div>
        </footer>
    );
}
