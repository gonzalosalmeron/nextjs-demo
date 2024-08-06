'use client'

import Card from '../ui/card'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { LatLngExpression } from 'leaflet'
// sort-imports-ignore
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export default function Map() {
  const position = [36.72, -4.42]

  return (
    <Card icon={<MapPinIcon className='h-4 w-4' />} title='Location'>
      <MapContainer
        center={position as LatLngExpression}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '350px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position as LatLngExpression}>
          <Popup>Weather location</Popup>
        </Marker>
      </MapContainer>
    </Card>
  )
}
