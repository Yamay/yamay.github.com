/*
* jquery StripedTable Plugin v 1.0
* https://github.com/Yamay/stripedTables
*
* Copyright 2013 Rais Yamaev
* Released under the MIT license
* https://github.com/Yamay/stripedTables/
* Date: Mon Aug 19 2013 15:16:32 UTC+4 (Moscow Time)
*/

(function($){
	$.stripedTable=function(tableId,style,parity,applyToMerged)
	{	
		var columnsCount=0;
		var rowsCount;
		var wrappedTable='table#'+tableId;	
		$(wrappedTable+' tr:first td').each(function(n)
			{
				colspan=parseInt($(this).attr('colspan'));
				if (colspan>0)
					{
						columnsCount+=colspan;
					}
				else
					columnsCount++;				
			}
		);                              
		rowsCount=$(wrappedTable+' tr').size();		
		var Z=new Array (rowsCount*columnsCount);
		j=0;
		while (j<rowsCount*columnsCount)
			{ 
				Z[j]=j; 
				j++;
			};
		curPos=0;
		$(wrappedTable+' td').each(function(n)
    	    {
        		$colspan=parseInt($(this).attr('colspan'));
	        	$rowspan=parseInt($(this).attr('rowspan')); 
	        	if ($colspan>1) 
					{
						for (j=curPos+1;j<curPos+$colspan;j++)
							{
								Z[j]=-1;
							}  	
					}		 
				if ($rowspan>1)
					{
						for (i=1;i<$rowspan;i++)
							{   
								if ($colspan>1)
									{						
										for (j=0;j<$colspan;j++)
											Z[curPos+j+i*columnsCount]=-1;
									}
								else
									Z[curPos+i*columnsCount]=-1;	
							}										
					}
				Z[curPos]=n;
				if (($colspan>1) && (applyToMerged==0)) Z[curPos]=-1;
				curPos++;	 										
				while (Z[curPos]<0)
					{
						curPos++;
					} 					  
			}
		);		
		i=0;	
		while (i<rowsCount)
			{ 
				j=parity;
				while (j<columnsCount)
					{ 
						Z[i*columnsCount+j]=-1; 
						j++;
						j++;
					}
				i++;		
			}; 	
		$(wrappedTable+' td').each(function(n)
			{
				if ($.inArray(n,Z)>-1)
				 $(this).addClass(style);
			}	
		);	       	      
	};
})(jQuery);