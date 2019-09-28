import React, { Fragment } from "react";
import { Style } from "react-style-tag";
const Loader = ({ color }) => (
  <Fragment>
    <div class="lds-dual-ring"></div>
    <Style>
      {`
            .lds-dual-ring {
                display: inline-block;
                width: 64px;
                height: 64px;
            }
            .lds-dual-ring:after {
                content: " ";
                display: block;
                width: 46px;
                height: 46px;
                margin: 1px;
                border-radius: 50%;
                border: 5px solid ${color};
                border-color: ${color} transparent ${color} transparent;
                animation: lds-dual-ring 1.2s linear infinite;
            }
            @keyframes lds-dual-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `}
    </Style>
  </Fragment>
);

export default Loader;
