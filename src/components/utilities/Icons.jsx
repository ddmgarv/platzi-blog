import React, { Fragment } from "react";
import { Style } from "react-style-tag";

export const EyeIcon = () => {
  return (
    <Fragment>
      <div class="eye-solid3 icon"></div>
      <Style>
        {`
            .eye-solid3.icon {
                color: #000;
                margin-left: 3px;
                margin-top: 3px;
                width: 12px;
                height: 12px;
                border-radius: 70% 15%;
                border: solid 1px currentColor;
                background-color: currentColor;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
            }

            .eye-solid3.icon:before {
                content: '';
                position: absolute;
                left: 2px;
                top: 2px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                color: white;
                border: solid 1px currentColor;
            }
        `}
      </Style>
    </Fragment>
  );
};
