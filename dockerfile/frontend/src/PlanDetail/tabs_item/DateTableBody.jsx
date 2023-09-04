import React from "react";


export default function DateTableBody(){
    return(
        <tbody>
                <tr>
                    <td>
                        {/* p 요소로 반드시 작성해야함 */}
                            <p className="date-text">샘플</p>
                            <p className="date-text-day">DAY 1</p>
                        </td>
                        <td>
                            <ul className="circle-ul">
                                <li>서우르</li>
                            </ul>
                        </td>
                        <td>
                            <ul className="number-ul">
                                <li>asdf</li>
                        </ul>
                    </td>
                    <td>
                        <ul className="number-ul">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                        </ul>
                      </td>
                    </tr>
            </tbody>
    )
}