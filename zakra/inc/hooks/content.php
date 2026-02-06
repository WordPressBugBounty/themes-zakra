<?php
/**
 * Zakra content area functions to be hooked.
 *
 * @package zakra
 */

if ( ! function_exists( 'zakra_post_readmore' ) ) :

	/**
	 * Post read more HTML.
	 *
	 * @param string $readmore_alignment CSS class.
	 */
	function zakra_post_readmore( $readmore_alignment ) {
		?>
		<div class="<?php zakra_css_class( 'zakra_read_more_wrapper_class' ); ?> zak-<?php echo esc_attr( $readmore_alignment ); ?>">

			<a href="<?php the_permalink(); ?>" class="entry-button">

				<?php echo apply_filters( 'zakra_read_more_text', esc_html__( 'Read More', 'zakra' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php zakra_get_icon( 'arrow-right-long' ); ?>

			</a>
		</div> <!-- /.zak-entry-footer -->
		<?php
	}
endif;

if ( ! function_exists( 'zakra_get_sidebar' ) ) {

	function zakra_get_sidebar( $sidebar ) {

		$current_layout = zakra_get_current_layout();

		preg_match( '/zak-site-layout--(no_sidebar|left|right|both)/', $current_layout, $m_sidebar );
		$current_layout = $m_sidebar[0] ?? '';

		$sidebar_meta              = get_post_meta( zakra_get_post_id(), 'zakra_page_sidebar_layout', true );
		$single_page_layout        = get_theme_mod( 'zakra_single_page_sidebar_layout', 'default' );
		$single_post_layout        = get_theme_mod( 'zakra_single_post_sidebar_layout', 'default' );
		$blog_layout               = get_theme_mod( 'zakra_blog_sidebar_layout', 'default' );
		$global_sidebar_layout     = get_theme_mod( 'zakra_global_sidebar_layout', 'default' );
		$customizer_sidebar_layout = '';

		if ( 'customizer' === $sidebar_meta || 'default' === $sidebar_meta || empty( $sidebar_meta ) ) {
			if ( is_singular( 'page' ) || is_404() ) {
				if ( 'default' === $single_page_layout ) {
					$customizer_sidebar_layout = $global_sidebar_layout;
				} else {
					$customizer_sidebar_layout = $single_page_layout;
				}
			} elseif ( is_singular() ) {
				if ( 'default' === $single_post_layout ) {
					$customizer_sidebar_layout = $global_sidebar_layout;
				} else {
					$customizer_sidebar_layout = $single_post_layout;
				}
			} elseif ( is_archive() || is_home() ) {
				if ( 'default' === $blog_layout ) {
					$customizer_sidebar_layout = $global_sidebar_layout;
				} else {
					$customizer_sidebar_layout = $blog_layout;
				}
			}

			if ( 'right' === $customizer_sidebar_layout ) {
				$sidebar = 'sidebar-right';
			} elseif ( 'left' === $customizer_sidebar_layout || 'zak-site-layout--left' === $current_layout ) {
				$sidebar = 'sidebar-left';
			} elseif ( 'no_sidebar' === $customizer_sidebar_layout ) {
				$sidebar = 'sidebar-none';
			}
			return $sidebar;

		} else {
			$sidebar = '';
			if ( 'right' === $sidebar_meta ) {
				$sidebar = 'sidebar-right';
			} elseif ( 'left' === $sidebar_meta || 'zak-site-layout--left' === $current_layout ) {
				$sidebar = 'sidebar-left';
			} elseif ( 'no_sidebar' === $sidebar_meta ) {
				$sidebar = 'sidebar-none';
			}
			return $sidebar;
		}
	}
}

if ( ! function_exists( 'zakra_set_posts_per_page' ) ) {

	function zakra_set_posts_per_page( $query ) {

		if ( $query->is_search() && ! is_admin() ) {
			$posts_per_page = get_theme_mod( 'zakra_search_results_posts_per_page', array( 'size' => 10 ) );
			if ( is_array( $posts_per_page ) && isset( $posts_per_page['size'] ) ) {
				$query->set( 'posts_per_page', $posts_per_page['size'] );
			} else {
				$query->set( 'posts_per_page', 10 );
			}
		}
	}
}
