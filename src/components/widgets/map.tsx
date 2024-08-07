'use client'

import Card from '../ui/card'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { LatLngExpression } from 'leaflet'
// sort-imports-ignore
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function Map({
  coordinates = [36.72, -4.42],
}: {
  coordinates: [number, number]
}) {
  const position = coordinates as LatLngExpression

  return (
    <Card icon={<MapPinIcon className='h-4 w-4' />} title='Location'>
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '286px', width: '100%' }}
      >
        <MapEvents coordinates={coordinates} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>Weather location</Popup>
        </Marker>
      </MapContainer>
    </Card>
  )
}

const MapEvents = ({ coordinates }: { coordinates: [number, number] }) => {
  const map = useMap()
  map.setView(coordinates)
  return null
}
