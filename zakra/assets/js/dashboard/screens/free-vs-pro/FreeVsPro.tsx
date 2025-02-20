import { __ } from '@wordpress/i18n';
import React from 'react';
import { features } from '../../constants';

const FreeVsPro: React.FC = () => {
	return (
		<>
			<div>
				{Object.entries(features).map(([category, { showFreePro, items }]) => (
					<div key={category}>
						<table className="w-full fvp-table relative">
							<thead>
								<tr className="nfvp-heading text-left bg-[#F4F4F4] text-[#6B6B6B] sticky top-0">
									<th className="p-3 text-sm font-semibold leading-8 w-6/12">
										{category}
									</th>
									<th className="p-3 text-sm font-semibold leading-8">Free</th>
									<th className="p-3 text-sm font-semibold leading-8">Pro</th>
								</tr>
							</thead>
							<tbody>
								{items.map(([feature, free, pro], index) => (
									<tr key={index}>
										<td className="p-3 bg-white text-sm font-normal leading-8 w-6/12">
											{feature}
										</td>
										<td className="p-3 bg-white text-sm font-normal leading-8 ">
											{free}
										</td>
										<td className="p-3 bg-white text-sm font-normal leading-8">
											{pro}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				))}
				<div className="postbox mt-4 text-center p-8">
					<div className="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="82"
							height="70"
							viewBox="0 0 82 70"
							fill="none"
						>
							<path
								d="M62.6843 8.04063L40.8137 0L19.1521 7.9347C16.3861 9.26999 13.9611 10.0724 13.9611 12.7077V25.8488C13.916 35.0457 16.3833 44.0809 21.098 51.9832C25.1376 58.695 31.39 65.6057 41.0388 70C49.8932 67.0566 56.5026 59.2086 60.5423 52.4936C65.2572 44.5926 67.7246 35.5583 67.6791 26.3623V14.5437C67.6631 10.7818 65.7172 8.9458 62.6843 8.04063Z"
								fill="#4A7EEE"
							></path>
							<g opacity="0.8">
								<path
									d="M62.6843 8.04063L40.8137 0L19.1521 7.9347C16.3861 9.26999 13.9611 10.0724 13.9611 12.7077V25.8488C13.916 35.0457 16.3833 44.0809 21.098 51.9832C25.1376 58.695 31.39 65.6057 41.0388 70C49.8932 67.0566 56.5026 59.2085 60.5423 52.4936C65.2572 44.5926 67.7246 35.5583 67.6791 26.3623V14.5437C67.6631 10.7818 65.7172 8.9458 62.6843 8.04063Z"
									fill="white"
								></path>
							</g>
							<path
								d="M54.1669 41.2814H50.1466V19.4546C50.1466 16.9828 49.1627 14.6123 47.4114 12.8645C45.6601 11.1167 43.2848 10.1348 40.8081 10.1348C38.3314 10.1348 35.9562 11.1167 34.2049 12.8645C32.4536 14.6123 31.4697 16.9828 31.4697 19.4546V41.2814H27.4494V19.4546C27.4219 17.6864 27.7471 15.9304 28.4061 14.2888C29.0651 12.6473 30.0447 11.1529 31.2879 9.89282C32.5311 8.6327 34.0131 7.63198 35.6475 6.94891C37.2819 6.26584 39.0362 5.91406 40.8081 5.91406C42.5801 5.91406 44.3343 6.26584 45.9688 6.94891C47.6032 7.63198 49.0851 8.6327 50.3283 9.89282C51.5715 11.1529 52.5512 12.6473 53.2102 14.2888C53.8692 15.9304 54.1944 17.6864 54.1669 19.4546V41.2814Z"
								fill="#4A7EEE"
							></path>
							<g opacity="0.4">
								<path
									d="M54.1679 41.2814H50.1475V19.4546C50.1475 16.9828 49.1637 14.6123 47.4124 12.8645C45.6611 11.1167 43.2858 10.1348 40.8091 10.1348C38.3324 10.1348 35.9571 11.1167 34.2058 12.8645C32.4545 14.6123 31.4707 16.9828 31.4707 19.4546V41.2814H27.4503V19.4546C27.4228 17.6864 27.7481 15.9304 28.4071 14.2888C29.0661 12.6473 30.0457 11.1529 31.2889 9.89282C32.5321 8.6327 34.014 7.63198 35.6485 6.94891C37.2829 6.26584 39.0371 5.91406 40.8091 5.91406C42.5811 5.91406 44.3353 6.26584 45.9697 6.94891C47.6042 7.63198 49.0861 8.6327 50.3293 9.89282C51.5725 11.1529 52.5521 12.6473 53.2111 14.2888C53.8701 15.9304 54.1954 17.6864 54.1679 19.4546V41.2814Z"
									fill="black"
								></path>
							</g>
							<path
								d="M56.9436 31.5684H24.6748C23.6428 31.5684 22.8062 32.4033 22.8062 33.4333V52.7564C22.8062 53.7864 23.6428 54.6214 24.6748 54.6214H56.9436C57.9756 54.6214 58.8123 53.7864 58.8123 52.7564V33.4333C58.8123 32.4033 57.9756 31.5684 56.9436 31.5684Z"
								fill="#4A7EEE"
							></path>
							<g opacity="0.5">
								<path
									d="M43.8172 40.0942C43.8176 39.5352 43.6617 38.9871 43.367 38.5117C43.0723 38.0363 42.6505 37.6523 42.1491 37.4031C41.6477 37.1538 41.0866 37.0491 40.5288 37.1007C39.971 37.1524 39.4388 37.3583 38.9919 37.6953C38.545 38.0323 38.2011 38.4871 37.9991 39.0085C37.797 39.5299 37.7447 40.0973 37.8481 40.6467C37.9515 41.1961 38.2064 41.7059 38.5842 42.1186C38.962 42.5314 39.4477 42.8308 39.9867 42.9831V47.4768H41.6302V42.9831C42.2607 42.8058 42.8158 42.4275 43.2107 41.9058C43.6056 41.3842 43.8186 40.748 43.8172 40.0942Z"
									fill="black"
								></path>
							</g>
							<path
								d="M24.7246 52.4363C24.641 52.4363 24.5767 48.5845 24.5767 43.85C24.5767 39.1155 24.641 35.2637 24.7246 35.2637C24.8082 35.2637 24.8758 39.1155 24.8758 43.85C24.8758 48.5845 24.8082 52.4363 24.7246 52.4363Z"
								fill="#FAFAFA"
							></path>
							<path
								d="M38.452 43.9422C38.452 43.9422 38.3105 43.8972 38.0982 43.7432C37.8007 43.5213 37.5392 43.255 37.3231 42.9536C36.9477 42.4591 36.6865 41.888 36.5581 41.281C36.4298 40.674 36.4375 40.0462 36.5807 39.4426C36.724 38.8389 36.9992 38.2743 37.3866 37.7892C37.774 37.3041 38.2642 36.9105 38.8219 36.6366C39.1555 36.4648 39.5134 36.3446 39.8832 36.2803C40.0152 36.2442 40.1533 36.2366 40.2885 36.2578C40.2885 36.3156 39.7192 36.3702 38.9376 36.8228C38.4275 37.1043 37.982 37.4891 37.6297 37.9526C37.2774 38.4161 37.0261 38.9479 36.8919 39.5141C36.7578 40.0802 36.7437 40.6681 36.8506 41.2399C36.9575 41.8118 37.1831 42.3551 37.5128 42.8348C37.7951 43.2289 38.1092 43.5992 38.452 43.9422Z"
								fill="#FAFAFA"
							></path>
							<path
								d="M2.08299 57.8382C2.84857 57.8382 3.4692 57.2188 3.4692 56.4547C3.4692 55.6907 2.84857 55.0713 2.08299 55.0713C1.3174 55.0713 0.696777 55.6907 0.696777 56.4547C0.696777 57.2188 1.3174 57.8382 2.08299 57.8382Z"
								fill="#4A7EEE"
							></path>
							<path
								d="M81.3022 12.5917C81.3016 12.8652 81.2197 13.1324 81.067 13.3594C80.9143 13.5865 80.6976 13.7633 80.4443 13.8676C80.1909 13.9718 79.9123 13.9987 79.6436 13.945C79.3749 13.8912 79.1282 13.7592 78.9347 13.5656C78.7411 13.372 78.6094 13.1255 78.5562 12.8572C78.503 12.589 78.5306 12.311 78.6356 12.0584C78.7406 11.8058 78.9183 11.5899 79.1462 11.438C79.3741 11.2861 79.642 11.2051 79.916 11.2051C80.0983 11.2051 80.2788 11.241 80.4472 11.3107C80.6156 11.3804 80.7686 11.4826 80.8973 11.6114C81.0261 11.7402 81.1281 11.8931 81.1976 12.0613C81.2671 12.2295 81.3026 12.4098 81.3022 12.5917Z"
								fill="#4A7EEE"
							></path>
							<path
								d="M11.8184 60.0269C11.8184 60.0969 11.7976 60.1653 11.7586 60.2234C11.7195 60.2815 11.6641 60.3268 11.5993 60.3534C11.5344 60.3801 11.4631 60.3869 11.3944 60.373C11.3257 60.3591 11.2627 60.3251 11.2133 60.2754C11.164 60.2257 11.1305 60.1625 11.1173 60.0938C11.104 60.0251 11.1114 59.954 11.1387 59.8896C11.166 59.8251 11.2118 59.7702 11.2704 59.7318C11.329 59.6934 11.3977 59.6732 11.4678 59.6738C11.5611 59.6747 11.6503 59.7123 11.7159 59.7784C11.7816 59.8445 11.8184 59.9338 11.8184 60.0269Z"
								fill="#4A7EEE"
							></path>
							<path
								d="M19.3419 21.2457C19.3419 21.3155 19.3211 21.3838 19.2822 21.4418C19.2434 21.4999 19.1881 21.5451 19.1235 21.5719C19.0588 21.5986 18.9877 21.6056 18.919 21.592C18.8504 21.5783 18.7874 21.5447 18.7379 21.4953C18.6884 21.4459 18.6547 21.383 18.6411 21.3145C18.6274 21.2461 18.6344 21.1751 18.6612 21.1105C18.688 21.046 18.7333 20.9909 18.7915 20.9521C18.8497 20.9133 18.9181 20.8926 18.9881 20.8926C19.0819 20.8926 19.1719 20.9298 19.2382 20.996C19.3046 21.0622 19.3419 21.152 19.3419 21.2457Z"
								fill="#4A7EEE"
							></path>
							<path
								d="M74.337 40.0972C74.337 40.1672 74.3161 40.2356 74.2771 40.2937C74.2381 40.3519 74.1826 40.3971 74.1178 40.4237C74.053 40.4504 73.9817 40.4572 73.913 40.4433C73.8443 40.4294 73.7812 40.3954 73.7319 40.3457C73.6825 40.296 73.6491 40.2328 73.6358 40.1641C73.6225 40.0954 73.63 40.0243 73.6573 39.9599C73.6845 39.8954 73.7304 39.8405 73.789 39.8021C73.8476 39.7637 73.9163 39.7435 73.9864 39.7442C74.0327 39.7442 74.0786 39.7533 74.1213 39.7711C74.1641 39.7889 74.2028 39.8149 74.2354 39.8478C74.268 39.8806 74.2938 39.9195 74.3112 39.9624C74.3286 40.0052 74.3374 40.051 74.337 40.0972Z"
								fill="#4A7EEE"
							></path>
							<path
								d="M79.2344 26.3792C79.2351 26.4493 79.2148 26.518 79.1761 26.5765C79.1375 26.6351 79.0823 26.6808 79.0175 26.708C78.9527 26.7351 78.8813 26.7423 78.8124 26.7288C78.7435 26.7153 78.6802 26.6816 78.6305 26.632C78.5808 26.5825 78.547 26.5193 78.5335 26.4505C78.5199 26.3817 78.5272 26.3104 78.5544 26.2458C78.5816 26.1811 78.6274 26.126 78.6861 26.0875C78.7448 26.0489 78.8136 26.0287 78.8839 26.0293C78.9768 26.0293 79.066 26.0662 79.1317 26.1318C79.1975 26.1974 79.2344 26.2864 79.2344 26.3792Z"
								fill="#4A7EEE"
							></path>
						</svg>
					</div>
					<h3 className="py-4">{__('Upgrade Now', 'zakra')}</h3>
					<p className="pb-4">
						{__(
							`Access all premium extensions, features, and upcoming updates right
						away by upgrading to the Pro version.`,
							'zakra',
						)}
					</p>
					<a
						className="py-[10px] px-4 bg-[#2563EB] text-white font-normal rounded-[5px] mt-4 no-underline text-sm hover:text-white"
						href="https://zakratheme.com/pricing/?utm_source=zakra-theme&amp;utm_medium=upgrade-now-banner&amp;utm_campaign=zakra-free-vs-pro&amp;utm_content=Get+Zakra+Pro+Now"
						target="_blank"
					>
						<span>{__('Get Zakra Pro Now', 'zakra')}</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default FreeVsPro;
