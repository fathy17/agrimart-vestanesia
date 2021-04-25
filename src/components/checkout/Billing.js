import React, { useEffect, useState } from 'react';
import countryList from './country-list';
import Error from './Error';
import axios from 'axios';
import { cityId, stateId } from '../../woongkir-state';

const Billing = ({ input, handleOnChange }) => {
  const [province, setProvince] = useState(null);
  const [cityList, setCityList] = useState([]);

  const provinceList = stateId;

  const handleFetchCity = () => {
    const provinceId = province[0].id;

    const city = cityId.filter((item) => item.state_id === provinceId);
    setCityList(city);
  };

  return (
    <React.Fragment>
      {/*Name*/}
      <div className="">
        <div className="">
          <div className="form-group mb-3">
            <label className="text-xs" htmlFor="first-name">
              Nama depan
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <input
              required
              onChange={handleOnChange}
              value={input.firstName}
              type="text"
              name="firstName"
              className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
              id="first-name"
            />
            <Error errors={input.errors} fieldName={'firstName'} />
          </div>
        </div>
        <div className="">
          <div className="form-group mb-3">
            <label className="text-xs" htmlFor="last-name">
              Nama Belakang
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <input
              required
              onChange={handleOnChange}
              value={input.lastName}
              type="text"
              name="lastName"
              className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
              id="last-name"
            />
            <Error errors={input.errors} fieldName={'lastName'} />
          </div>
        </div>
      </div>
      {/* Street Address */}
      <div className="form-group mb-3">
        <label className="text-xs" htmlFor="street-address">
          Alamat
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          required
          type="text"
          onChange={handleOnChange}
          value={input.address1}
          name="address1"
          placeholder="House number and street name"
          className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded mb-3"
          id="street-address"
        />
        <Error errors={input.errors} fieldName={'address1'} />
        <br />
        <input
          type="text"
          onChange={handleOnChange}
          value={input.address2}
          name="address2"
          placeholder="Apartment, suite, unit etc.(optional)"
          className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
          id="subdistrict"
        />
      </div>
      {/* Country */}
      <div className="form-group mb-3">
        <label className="text-xs" htmlFor="country-select">
          Negara
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <select
          onChange={handleOnChange}
          value={input.country}
          name="country"
          className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
          id="country-select"
        >
          <option value="">Pilih Negara</option>
          {countryList.length &&
            countryList.map((country, index) => (
              <option key={`${country}-${index}`} value={country.countryCode}>
                {country.countryName}
              </option>
            ))}
        </select>
        <Error errors={input.errors} fieldName={'country'} />
      </div>
      {/* County */}
      <div className="form-group mb-3">
        <label className="text-xs" htmlFor="state">
          Provinsi
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <select
          onChange={(event) => {
            handleOnChange(event);
            setProvince(
              provinceList.filter((item) => item.value === event.target.value)
            );
          }}
          value={input.state}
          name="state"
          className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
          id="state"
        >
          <option value="">Pilih Provinsi...</option>
          {provinceList.length &&
            provinceList.map((prov) => (
              <option key={prov.id} value={prov.value}>
                {prov.label}
              </option>
            ))}
        </select>
        <Error errors={input.errors} fieldName={'state'} />
      </div>
      {/* Town/City */}
      <div className="form-group mb-3">
        <label className="text-xs" htmlFor="city">
          Kota
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <select
          disabled={!province ? true : false}
          onChange={handleOnChange}
          onClick={handleFetchCity}
          value={input.city}
          name="city"
          className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
          id="city"
        >
          <option value="">Pilih Kota...</option>
          {cityList.length &&
            cityList.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
        </select>
        <Error errors={input.errors} fieldName={'city'} />
      </div>
      {/* Post Code */}
      <div className="form-group mb-3">
        <label className="text-xs" htmlFor="post-code">
          Kode pos
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          required
          onChange={handleOnChange}
          value={input.postcode}
          type="text"
          name="postcode"
          className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
          id="post-code"
        />
        <Error errors={input.errors} fieldName={'postcode'} />
      </div>
      {/*Phone & Email*/}
      <div className="row">
        <div className="col-lg-6 col-md-12 p-0">
          <div className="form-group mb-3">
            <label className="text-xs" htmlFor="phone">
              No. Telpon
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <input
              required
              onChange={handleOnChange}
              value={input.phone}
              type="text"
              name="phone"
              className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
              id="phone"
            />
            <Error errors={input.errors} fieldName={'phone'} />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 p-0">
          <div className="form-group mb-3">
            <label className="text-xs" htmlFor="email">
              Email
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <input
              required
              onChange={handleOnChange}
              value={input.email}
              type="email"
              name="email"
              className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
              id="email"
            />
            <Error errors={input.errors} fieldName={'email'} />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 p-0">
          <div className="form-group mb-3">
            <label className="text-xs" htmlFor="email">
              Informasi Tambahan
            </label>
            <textarea
              onChange={handleOnChange}
              value={input.customerNote}
              name="customerNote"
              className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
              id="customerNote"
            />
            <Error errors={input.errors} fieldName={'customerNote'} />
          </div>
        </div>
      </div>
      {/*	@TODO Create an Account */}
      {/*<div className="form-check">*/}
      {/*	<label className="text-xs" className="form-check-label">*/}
      {/*		<input
      required onChange={ handleOnChange } className="form-check-input" name="createAccount" type="checkbox"/>*/}
      {/*			Create an account?*/}
      {/*	</label>*/}
      {/*</div>*/}
      {/*<h2 className="mt-4 mb-4">Additional Information</h2>*/}
      {/* @TODO Order Notes */}
      {/*<div className="form-group mb-3">*/}
      {/*	<label className="text-xs" htmlFor="order-notes">Order Notes</label>*/}
      {/*	<textarea onChange={ handleOnChange } defaultValue={ input.orderNotes } name="orderNotes" className="form-control woo-next-checkout-textarea" id="order-notes" rows="4"/>*/}
      {/*	<Error errors={ input.errors } fieldName={ 'orderNotes' }/>*/}
      {/*</div>*/}
    </React.Fragment>
  );
};

export default Billing;
