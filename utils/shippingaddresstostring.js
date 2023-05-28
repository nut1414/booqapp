export default function shippingaddresstostring(shipobject) {
  return `${shipobject.Name}, ${shipobject.Address}, ${shipobject.ZipCode}, ${shipobject.PhoneNumber}`
}