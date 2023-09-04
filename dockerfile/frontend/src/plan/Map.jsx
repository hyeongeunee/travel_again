import React, { useEffect } from 'react';
import './Map.css';
import { textOverCut } from './textOverCut.js';

function Map({ selectedItems }) {
    useEffect(() => {
        const { kakao } = window;
        const container = document.getElementById('map');

        const options = {
            center: new kakao.maps.LatLng(37.4987464, 127.03169),
            level: 9,
        };
        const map = new kakao.maps.Map(container, options);

        const positions = [];

        let linePath = [];

        // Map 컴포넌트 내에서 flattenedItems 로컬 변수로 설정
        const flattenedItems = selectedItems.flat();

        for (let i = 0; i < flattenedItems.length; i++) {
            const position = {
                title: flattenedItems[i].title,
                latlng: new kakao.maps.LatLng(flattenedItems[i].mapy, flattenedItems[i].mapx),
                firstimage: flattenedItems[i].firstimage,
            };
            positions.push(position);
        }

        for (let j = 0; j < positions.length; j++) {
            if (j !== 0) {
                linePath = [positions[j - 1].latlng, positions[j].latlng];
            }

            const drawLine = new kakao.maps.Polyline({
                map: map,
                path: linePath,
                strokeWeight: 3,
                strokeColor: '#db4040',
                strokeOpacity: 1,
                strokeStyle: 'solid',
            });
        }

        const imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';
        const overlays = [];

        for (let k = 0; k < positions.length; k++) {
            const imageSize = new kakao.maps.Size(24, 35);
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            const marker = new kakao.maps.Marker({
                map: map,
                position: positions[k].latlng,
                title: positions[k].title,
                image: markerImage,
            });

            const content = `<div class="overlaybox">
                        <div class="boxtitle" onclick="closeOverlay(${k})">${flattenedItems[k].title}</div>
                        <div class="first">
                            <img src="${
                                positions[k].firstimage
                            }" alt="tour Image" style="width: 100%; height: 100%; object-fit: cover;">
                            <div class="triangle text">${k + 1}</div>
                            <div class="addr text">${flattenedItems[k].addr1}</div>
                        </div>
                        <span class="title">
                        ${textOverCut(flattenedItems[k].overview, 102, ' ... ')}
                        </span>
                    </div>`;

            const overlay = new kakao.maps.CustomOverlay({
                position: positions[k].latlng,
                content: content,
                xAnchor: 0.3,
                yAnchor: 0.91,
            });

            overlays.push(overlay);

            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, overlay));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(overlay));
            kakao.maps.event.addListener(marker, 'click', makeClickListener(overlay));
        }

        function makeOverListener(map, overlay) {
            return function () {
                overlay.setMap(map);
            };
        }

        function makeOutListener(overlay) {
            return function () {
                overlay.setMap(null);
            };
        }

        function makeClickListener(overlay) {
            return function () {
                overlay.setMap(map);
            };
        }

        window.closeOverlay = function (index) {
            overlays[index].setMap(null);
        };
    }, [selectedItems]);

    return (
        <div
            id="map"
            style={{
                width: '100%',
                height: '900px',
            }}
        ></div>
    );
}

export default Map;
