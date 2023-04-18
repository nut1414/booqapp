import { TextBox } from "@/components/input/TextBox";
import React, { useState } from 'react';
import dataset from "@/public/raw_database.json"
import { SelectBox } from "@/components/input/SelectBox";


export function PostalPicker({ }) {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedAmphoe, setSelectedAmphoe] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [postcode, setPostcode] = useState('')

  const provinces = [...new Set(dataset.map((item) => item.province))]
  const filteredAmphoes = dataset.filter(
    (item) => item.province === selectedProvince
  )
  const amphoes = [...new Set(filteredAmphoes.map((item) => item.amphoe))]
  const filteredDistricts = filteredAmphoes.filter(
    (item) => item.amphoe === selectedAmphoe
  )
  const districts = filteredDistricts.map((item) => item.district)

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value)
    setSelectedAmphoe('')
    setSelectedDistrict('')
    setPostcode('')
  }

  const handleAmphoeChange = (e) => {
    setSelectedAmphoe(e.target.value)
    setSelectedDistrict('')
    setPostcode('')
  }

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value)
    const selectDistrict = filteredDistricts.find(
      (item) => item.district === e.target.value
    )
    setPostcode(selectDistrict?.zipcode)
  }

  return (
    <>
      <SelectBox label="Province" name="province" onChange={handleProvinceChange} >
        <option value="">Please select a province</option>
        {provinces.map((province) => (
          <option key={province} value={province} className="">
            {province}
          </option> 
        ))}
      </SelectBox>
      {selectedProvince && (
        <SelectBox label="Amphoe" name="amphoe" onChange={handleAmphoeChange} value={selectedAmphoe}>
            <option value="">Please select an amphoe</option>
            {amphoes.map((amphoe) => (
              <option key={amphoe} value={amphoe}>
                {amphoe}
              </option>
            ))}
        </SelectBox>
      )}
      {selectedAmphoe && (
        <SelectBox label="District" name="district" onChange={handleDistrictChange} value={selectedDistrict}>
            <option value="">Please select a district</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </SelectBox>
      )}
      {postcode && <TextBox name="postcode" label="Postcode" value={postcode} readOnly/>}
    </>
  )
}