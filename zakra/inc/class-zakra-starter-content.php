<?php
/**
 * Zakra starter content.
 *
 * Provides Customizer "starter content" so a fresh site — including the
 * WordPress.org theme preview — can show a designed static front page instead of
 * the default blog. Only a single Home page is offered.
 *
 * On a fresh site the Home page is staged in the Customizer and would be created
 * the moment the user clicks "Publish" ( even when publishing unrelated changes ).
 * To avoid creating it unintentionally, a notice lets the user choose to keep the
 * starter homepage or start with a clean slate ( mirrors the Neve approach ).
 *
 * @package zakra
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Zakra_Starter_Content' ) ) {

	/**
	 * Class Zakra_Starter_Content.
	 */
	class Zakra_Starter_Content {

		const HOME_SLUG = 'home';

		/**
		 * Return the starter content definition.
		 *
		 * Only a Home page is added. The page is self-contained ( it carries its
		 * own header, footer and styling via block markup and the Canvas template ),
		 * so no nav menus, widgets or theme mods are needed.
		 *
		 * @return array
		 */
		public static function get() {

			$content = array(
				// Use a static front page so the preview shows the designed Home page.
				'options' => array(
					'show_on_front' => 'page',
					'page_on_front' => '{{' . self::HOME_SLUG . '}}',
				),

				// Single starter page: Home.
				'posts'   => array(
					self::HOME_SLUG => require __DIR__ . '/compatibility/starter-content/home.php',
				),
			);

			return apply_filters( 'zakra_starter_content', $content );
		}

		/**
		 * Enqueue the "fresh site" Customizer notice.
		 *
		 * Shown only on a fresh site ( the same condition WordPress uses to import
		 * starter content ). Lets the user keep the starter Home page or discard it
		 * so it is not published when they click "Publish".
		 *
		 * @return void
		 */
		public static function enqueue_fresh_site_notice() {

			// Only when the site is still fresh ( no published content yet ).
			if ( ! get_option( 'fresh_site' ) ) {
				return;
			}

			wp_enqueue_script(
				'zakra-starter-content-notice',
				get_template_directory_uri() . '/inc/compatibility/starter-content/customize-notice.js',
				array( 'customize-controls', 'jquery' ),
				defined( 'ZAKRA_THEME_VERSION' ) ? ZAKRA_THEME_VERSION : false,
				true
			);

			wp_localize_script(
				'zakra-starter-content-notice',
				'zakraStarterContent',
				array(
					'title'   => __( 'Welcome to your new site!', 'zakra' ),
					'message' => __( 'We\'ve added a starter homepage to help you get going quickly. It is only published if you keep it.', 'zakra' ),
					'keep'    => __( 'Keep the starter homepage', 'zakra' ),
					'clean'   => __( 'Start with a clean slate', 'zakra' ),
					'note'    => __( 'Don\'t worry — you can always change this later.', 'zakra' ),
				)
			);

			wp_add_inline_style( 'customize-controls', self::notice_css() );
		}

		/**
		 * Inline CSS for the Customizer notice card.
		 *
		 * @return string
		 */
		private static function notice_css() {

			return '.zakra-sc-notice{margin:12px;padding:16px;background:#fff;border:1px solid #dcdcde;border-left:4px solid #2271b1;border-radius:2px;}'
				. '.zakra-sc-notice h3{margin:0 0 6px;font-size:14px;line-height:1.4;}'
				. '.zakra-sc-notice p{margin:0 0 12px;color:#50575e;font-size:13px;line-height:1.5;}'
				. '.zakra-sc-notice .button{display:block;width:100%;text-align:center;margin:0 0 8px;}'
				. '.zakra-sc-notice .zakra-sc-note{margin:10px 0 0;font-size:12px;color:#787c82;text-align:center;}';
		}
	}
}

add_action( 'customize_controls_enqueue_scripts', array( 'Zakra_Starter_Content', 'enqueue_fresh_site_notice' ) );
