<!DOCTYPE html>
<html xmlns="https://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<title>Article Library</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="en-US">

<link rel="stylesheet" href="css/uswds.min.css">
<link rel="stylesheet" href="css/custom.css">

<link rel='manifest' href="/manifest.json"></link>



</head>


<body>
<noscript class="text-center"><h2>****Javascript is disabled - Functionality may be limited.****</h2></noscript>
<?php
			$xml = simplexml_load_file('xml/ia-articles.xml') or die ("Error: Unable to load library");
			$article = $xml->article;
			$headers = $xml->article->children();
?>

	
	
<!--

				ASIDE

-->


<!--

				MAIN

-->
<div class="usa-width-one-whole usa-layout-docs-main_content">
	<div class="usa-grid-full search-bar">
		<div class="usa-width-two-thirds">
   			<form class="usa-search usa-search-big">
      			<div role="search">
        			<label class="usa-sr-only" for="search-field-big">Search big</label>
        			<input id="search-field-big" type="search" class="filter" name="search" placeholder="Title, keyword, author, practice, etc.">
        			<button type="submit">
          				<span class="usa-search-submit-text">Search</span>
        			</button>
      			</div>
    		</form>
		</div>
		<div class="usa-width-one-third">
			<button value="list" class="usa-button-secondary list btn-view">List</button>
			<button value="grid" class="usa-button-secondary grid btn-view">Grid</button>
		</div>
	</div>
	<!--<div class="usa-grid-full"></div>
		<div class="usa-width-one-fourth">
			<label for="sort-options">sort by:</label>	
			<select name="sort-options" class="page-select">
				<option value="alpha">Alphabetical</option>
				<option value="recent">Most Recent</option>
				<option value="old">Oldest</option>
			</select>
		</div>
		<div class="usa-width-one-sixth">
			<label for="items-per-page">Results per page</label>	
			<select name="items-per-page" class="page-select">
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
				<option value="All" selected="selected">All</option>
			</select>
		</div>-->

	<div class="usa-grid-full">
		<div class="usa-width-one-whole">
			<div class="pagination"></div>
		</div>
	</div>

	<div class="usa-grid-full usa-background-dark">
		<div class="usa-width-one-third count">
		</div>
		<div class="usa-width-one-third">
			<label for="sort-options" class='no-wrap'>sort by:
			<select name="sort-options" class="sort-options">
				<option value="alpha">Alphabetical</option>
				<option value="recent">Most Recent</option>
				<option value="old">Oldest</option>
			</select>
			</label>	
		
		</div>
		<div class="usa-width-one-sixth">
			<label for="items-per-page" class="no-wrap">Results per page:	
			<select name="items-per-page" class="page-select">
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
				<option value="All" selected="selected">All</option>
			</select>
			</label>
		</div>
	</div>
 	<div id="article-library" class="usa-grid">
 		<?php 
 		
 			$count = 1;
			
			foreach ($article as $list) {
				$split_practice = array();	
				$practices = explode("," , $list->practice);
			
					
				$state = $list->state;
					
					switch($state) {
        			case "DC":
        				$state = "District of Columbia";
        				break;
        			case "AK":
        				$state = "Alaska";
        				break;
        			case "AL":
        				$state = "Alabama";
        				break;
        			case "AR":
        				$state = "AR";
        				break;
        			case "AZ":
        				$state = "Arizona";
        				break;
        			case "CA":
        				$state = "California";
        				break;
        			case "CO":
        				$state = "Colorado";
        				break;
        			case "CT":
        				$state = "Connecticut";
        				break;
        			case "DE":
        				$state = "Deleware";
        				break;
        			case "FL":
        				$state = "Florida";
        				break;
        			case "GA":
        				$state = "Georgia";
        				break;
        			case "HI":
        				$state = "Hawaii";
        				break;
        			case "IA":
        				$state = "Iowa";
        				break;
        			case "ID":
        				$state = "Idaho";
        				break;
        			case "IL":
        				$state = "Illinois";
        				break;
        			case "IN":
        				$state = "Indiana";
        				break;
        			case "KS":
        				$state = "Kansas";
        				break;
        			case "KY":
        				$state = "Kentucky";
        				break;
        			case "LA":
        				$state = "Louisiana";
        				break;
        			case "MA":
        				$state = "Massachusetts";
        				break;
        			case "MD":
        				$state = "Maryland";
        				break;
        			case "ME":
        				$state = "Maine";
        				break;
        			case "MI":
        				$state = "Michigan";
        				break;
        			case "MN":
        				$state = "Minnesota";
        				break;
        			case "MO":
        				$state = "Missouri";
        				break;
        			case "MS":
        				$state = "Mississippi";
        				break;
        			case "MT":
        				$state = "Montana";
        				break;
        			case "NC":
        				$state = "North Carolina";
        				break;
        			case "ND":
        				$state = "North Dakota";
        				break;
        			case "NE":
        				$state = "Nebraska";
        				break;
        			case "NH":
        				$state = "New Hampshire";
        				break;
        			case "NJ":
        				$state = "New Jersey";
        				break;
        			case "NM":
        				$state = "New Mexico";
        				break;
        			case "NV":
        				$state = "Nevada";
        				break;
        			case "NY":
        				$state = "New York";
        				break;
        			case "OH":
        				$state = "Ohio";
        				break;
        			case "OK":
        				$state = "Oklahoma";
        				break;
        			case "OR":
        				$state = "Oregon";
        				break;
        			case "PA":
        				$state = "Pennsylvania";
        				break;
        			case "RI":
        				$state = "Rhode Island";
        				break;
        			case "SC":
        				$state = "South Carolina";
        				break;
        			case "SD":
        				$state = "South Dakota";
        				break;
        			case "TN":
        				$state = "Tennessee";
        				break;
        			case "TX":
        				$state = "Texas";
        				break;
        			case "UT":
        				$state = "Uah";
        				break;
        			case "VA":
        				$state = "Virginia";
        				break;
        			case "VT":
        				$state = "Vermont";
        				break;
        			case "WA":
        				$state = "Washington";
        				break;
        			case "WI":
        				$state = "Wisconsin";
        				break;
        			case "WV":
        				$state = "West Virginia";
        				break;
        			case "WY":
        				$state = "Wyoming";
        				break;
        			default:
        				$state = "N/A";
    			}?>
    			
				<?php foreach($practices as $practice):
						switch($practice) {
    						case "AC":
    							array_push($split_practice, "Alley Cropping");
    							break;
    						case "FF":
    							array_push($split_practice, "Forest Farming");
    							break;
    						case "RFB":
    							array_push($split_practice, "Riparian Forest Buffer");
    							break;
    						case "SP":
    							array_push($split_practice, "Silvopasture");
    							break;
    						case "WB":
    							array_push($split_practice, "Windbreaks");
    							break;
    						case "All":
    							$split_practice = array("Alley Cropping, Forest Farming, Riparian Forest Buffer, Silvopasture, Windbreaks");
    							break;
    						default:
    							array_push($split_practice, "Other");
						}
					 endforeach; ?>
						<?php sort($split_practice)?>

								<div class='card'>
									<div class='card-img'>
										
										<img alt="Inside Agroforestry Cover" src='<?php echo $list->image; ?>'/>
										<div class="shadow"></div>
										
									</div>
									<div class='card-info-container'>
										<div class = 'card-title'>
										<a class='pub-tile' href=' <?php echo $list->url ?>' rel="noopener noreferrer" target='_blank'>	
											<h4 class='article-title hr'><?php echo $list -> topic; ?></h4>
										</a>
											
    									</div>
    								<div class ="card-info">
    									<h5>Author: </h5> <p class='author'><?php echo $list->author; ?></p>
    									<h5>Practices:</h5> <p class='practice'> <?php echo  join(", ", $split_practice); ?></p>
    									<h5>Region:</h5> <p class='region'><?php echo $list->region; ?> </p>
    								</div>
    								<div class ='card-footer'>
    									
										<p class='year'> <?php echo $list->year; ?></p>
    								</div>
    								
									</div>
								</div>

			<?php }; ?>

 	</div>
 	

 
 
 
</div>


<!-- SCRIPTS -->

<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
<script src="js/uswds.min.js"></script>
<script src="js/jquery.tablesorter.js"></script>
<script src="js/jquery.mark.js"></script>
<script src="js/ia-article.js"></script>

</body>
</html>