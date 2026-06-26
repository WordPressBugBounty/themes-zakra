<?php
/**
 * Template Name: Canvas (No Header/Footer)
 *
 * A chrome-less template that outputs only the page content — no theme header,
 * footer, or page title. Used by the bundled starter-content homepage, whose
 * block markup provides its own header and footer, so the WordPress.org theme
 * preview renders that design exactly without duplicate chrome.
 *
 * @package zakra
 */

defined( 'ABSPATH' ) || exit;
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php
while ( have_posts() ) :
	the_post();
	the_content();
endwhile;
?>
<?php wp_footer(); ?>
</body>
</html>
